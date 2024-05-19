import { FC } from "react";
import "./Style.css";
import Text from "../../Atoms/Text";

type Selected = true | false;

interface Props {
	selected: Selected;
	text: string;
	callback?: (value: string) => void;
}

const LabelSelect: FC<Props> = ({ selected, text, callback }) => {
	return (
		<div
			className={`label-select ${
				selected == true ? "label-select--selected" : ""
			}`}
			aria-label="region"
			tabIndex={0}
			onClick={() => callback && callback(text)}
		>
			<Text
				size="two"
				text={text}
				colour={
					selected == true && callback ? "--grey-one" : "--grey-two"
				}
			/>
		</div>
	);
};

export default LabelSelect;
