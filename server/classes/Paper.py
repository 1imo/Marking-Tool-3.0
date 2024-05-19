import os
import json
import pathlib
import dotenv
from PyPDF2 import PdfReader
import google.generativeai as genai
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
from google.cloud import vision_v1
import fitz
import time
import pytesseract
from PIL import Image

# Load environment variables
dotenv.load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]
model = genai.GenerativeModel(model_name="gemini-1.5-flash-latest", safety_settings=safety_settings, generation_config=generation_config)

class Question:
    def __init__(self, question_number, question_text=None, answer_text=None, marks=None):
        self.question_number = question_number
        self.question_text = question_text
        self.answer_text = answer_text
        self.marks = marks

class Paper:
    def __init__(self, file_path):
        self.file_path = file_path
        self.text = ""
        self.questions = []
        self.extract_text()
        self.extract_questions()

    def extract_text(self):
        try:
            with open(self.file_path, 'rb') as pdf_file:
                pdf_reader = PdfReader(pdf_file)
                for page in pdf_reader.pages:
                    self.text += page.extract_text()
        except Exception as e:
            print(f"Error extracting text from PDF: {e}")

    def extract_questions(self):
        prompt = self.create_prompt()
        try:
            chat_session = model.start_chat(history=[])
            response = chat_session.send_message(prompt)
            response_text = response.text.strip()
            extracted_data = json.loads(response_text)
            for obj in extracted_data:
                question = Question(
                    question_number=obj.get("question_number", None),
                    question_text=obj.get("question_text", None),
                    answer_text=obj.get("answer_text", None),
                    marks=obj.get("marks", None)
                )
                self.questions.append(question)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}. Response text was: {response_text}")
        except Exception as e:
            print(f"Error extracting questions: {e}")

    def create_prompt(self):
        raise NotImplementedError("Subclasses should implement this method")

    def print_extracted_text(self):
        print("Extracted Text:")
        print(self.text)

class MarkScheme(Paper):
    def create_prompt(self):
        return (
            "You are a helpful assistant that will extract question details from a mark scheme. "
            "Extract each question's number, question text (if available), answer text, and marks. "
            "Output the extracted information as a valid JSON array of objects. "
            "If the question text is not available, leave the `question_text` field as null. "
            "Ensure that all text is properly escaped for JSON formatting. "
            "The marks must be the integer of marks available for the question. "
            "Here's the mark scheme text:\n\n"
            f"{self.text}\n\n"
            "Please provide the output as a JSON array alone. This will be parsed with json.loads(response.text) in python, don't include any other text in the response, even the three backticks and the json for your formatting, just the json array"
        )

class StudentPaper(Paper):
    def __init__(self, file_path, mark_scheme):
        super().__init__(file_path)
        self.mark_scheme = mark_scheme
        
    def create_prompt(self):
        return (
            "You are a helpful assistant that will extract question details from a student paper. "
            "Extract each question's number and answer text. "
            "Output the extracted information as a valid JSON array of objects. "
            "The answer text is the student's response to the question. "
            "In the answer, include reference to the students' working out methods, if any."
            "Make sure, the answer only refers to their work, not the question or your own working out. Just the students'"
            "The answer must be exactly what the student wrote, do not paraphrase or change the answer at all."
            ""
            "Ensure that all text is properly escaped for JSON formatting. "
            "Here's the student paper text:\n\n"
            f"{self.text}\n\n"
            "Please provide the output as a JSON array alone. This will be parsed with json.loads(response.text) in python, don't include any other text in the response, even the three backticks and the json for your formatting, just the json array"
        )

    def compare_answers(self):
        # NLP techniques to compare student answers with mark scheme answers
        stemmer = PorterStemmer()  # Create stemmer for word normalization
        for student_question in self.questions:
            for mark_scheme_question in self.mark_scheme.questions:
                if student_question.question_text and mark_scheme_question.question_text and \
                        student_question.question_text.lower() == mark_scheme_question.question_text.lower():
                    student_answer_tokens = word_tokenize(student_question.answer_text.lower())
                    student_answer_stems = [stemmer.stem(token) for token in student_answer_tokens]
                    mark_scheme_answer_tokens = word_tokenize(mark_scheme_question.answer_text.lower())
                    mark_scheme_answer_stems = [stemmer.stem(token) for token in mark_scheme_answer_tokens]
                    # Calculate similarity using cosine similarity (replace with other metrics if needed)
                    similarity_score = cosine_similarity([student_answer_stems, mark_scheme_answer_stems])[0][1]
                    student_question.marks = similarity_score * mark_scheme_question.marks

if __name__ == "__main__":
    mark_scheme_file = "../../mark_scheme.pdf"
    student_paper_file = "../../student_paper.pdf"

    mark_scheme = MarkScheme(mark_scheme_file)
    student_paper = StudentPaper(student_paper_file, mark_scheme)

    print("Mark Scheme Questions:")
    for question in student_paper.questions:
        print(f"Question No: {question.question_number}")
        print(f"Question: {question.question_text}")
        print(f"Answer: {question.answer_text}")
