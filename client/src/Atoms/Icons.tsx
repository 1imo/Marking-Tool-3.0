import { FC } from "react";

// Types
type IconType =
	| "Link"
	| "Basket"
	| "Back"
	| "Email"
	| "Add"
	| "Remove"
	| "Search"
	| "House"
	| "Pin"
	| "Map"
	| "User"
	| "Pie"
	| "Info";

type Colour =
	| "--grey-one"
	| "--grey-two"
	| "--grey-three"
	| "--grey-four"
	| "--white"
	| "--red";

// Props
interface Props {
	type: IconType;
	colour?: Colour;
}

// Returns icons based on the type prop with a stroke based on the colour prop
// Defaults to --grey-one
const Icon: FC<Props> = ({ type, colour = "--grey-one" }) => {
	let icon;

	switch (type) {
		case "Link":
			icon = (
				<svg
					viewBox="0 0 32 32"
					style={{}}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<mask id="link-mask">
							<rect width="32" height="32" fill="white" />
							<path
								d="M14.0002 9H12.2002C11.0801 9 10.5196 9 10.0918 9.21799C9.71547 9.40973 9.40973 9.71547 9.21799 10.0918C9 10.5196 9 11.0801 9 12.2002V19.8002C9 20.9203 9 21.4801 9.21799 21.9079C9.40973 22.2842 9.71547 22.5905 10.0918 22.7822C10.5192 23 11.079 23 12.1969 23H19.8031C20.921 23 21.48 23 21.9074 22.7822C22.2837 22.5905 22.5905 22.2839 22.7822 21.9076C23 21.4802 23 20.921 23 19.8031V18M24 13V8M24 8H19M24 8L17 15"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</mask>
					</defs>
				</svg>
			);
			break;
		case "Basket":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 8H6.77734C5.47772 8 4.82845 8 4.36621 8.26514C3.96058 8.49781 3.64877 8.86535 3.48595 9.30371C3.30053 9.80294 3.40726 10.4433 3.62065 11.7237L3.62109 11.7261L4.55443 17.3261C4.71276 18.276 4.79244 18.7512 5.02947 19.1077C5.23841 19.4219 5.5317 19.6703 5.87598 19.8247C6.26653 19.9999 6.74787 20 7.71094 20H16.2893C17.2524 20 17.7334 19.9999 18.124 19.8247C18.4682 19.6703 18.7618 19.4219 18.9707 19.1077C19.2077 18.7512 19.287 18.276 19.4453 17.3261L20.3786 11.7261L20.3796 11.7222C20.5928 10.4428 20.6995 9.80274 20.5141 9.30371C20.3513 8.86535 20.0402 8.49781 19.6346 8.26514C19.1724 8 18.522 8 17.2224 8H16M8 8H16M8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Back":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 15L9 12M9 12L12 9M9 12H20M20 7.24802V7.2002C20 6.08009 20 5.51962 19.782 5.0918C19.5903 4.71547 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9199 4 16.7998 4H7.1998C6.0797 4 5.52043 4 5.09261 4.21799C4.71628 4.40973 4.40952 4.71547 4.21777 5.0918C4 5.5192 4 6.07899 4 7.19691V16.8036C4 17.9215 4 18.4805 4.21777 18.9079C4.40952 19.2842 4.71628 19.5905 5.09261 19.7822C5.52001 20 6.079 20 7.19691 20H16.8031C17.921 20 18.4808 20 18.9082 19.7822C19.2845 19.5905 19.5903 19.2839 19.782 18.9076C20 18.4798 20 17.9201 20 16.8V16.75"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Email":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4 6L10.1076 10.6123L10.1097 10.614C10.7878 11.1113 11.1271 11.3601 11.4988 11.4562C11.8272 11.5412 12.1725 11.5412 12.501 11.4562C12.8729 11.36 13.2132 11.1105 13.8926 10.6123C13.8926 10.6123 17.8101 7.60594 20 6M3 15.8002V8.2002C3 7.08009 3 6.51962 3.21799 6.0918C3.40973 5.71547 3.71547 5.40973 4.0918 5.21799C4.51962 5 5.08009 5 6.2002 5H17.8002C18.9203 5 19.4796 5 19.9074 5.21799C20.2837 5.40973 20.5905 5.71547 20.7822 6.0918C21 6.5192 21 7.07899 21 8.19691V15.8036C21 16.9215 21 17.4805 20.7822 17.9079C20.5905 18.2842 20.2837 18.5905 19.9074 18.7822C19.48 19 18.921 19 17.8031 19H6.19691C5.07899 19 4.5192 19 4.0918 18.7822C3.71547 18.5905 3.40973 18.2842 3.21799 17.9079C3 17.4801 3 16.9203 3 15.8002Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Add":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Remove":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 12H16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Search":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "House":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20 17.0002V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522V17.0002C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74432 19.6452 5.23438 19.8482C5.60192 20.0005 6.06786 20.0005 6.99974 20.0005C7.93163 20.0005 8.39808 20.0005 8.76562 19.8482C9.25568 19.6452 9.64467 19.2555 9.84766 18.7654C9.9999 18.3979 10 17.932 10 17.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V17.0001C14 17.932 14 18.3979 14.1522 18.7654C14.3552 19.2555 14.7443 19.6452 15.2344 19.8482C15.6019 20.0005 16.0679 20.0005 16.9997 20.0005C17.9316 20.0005 18.3981 20.0005 18.7656 19.8482C19.2557 19.6452 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0002Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Pin":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5 9.92285C5 14.7747 9.24448 18.7869 11.1232 20.3252C11.3921 20.5454 11.5281 20.6568 11.7287 20.7132C11.8849 20.7572 12.1148 20.7572 12.271 20.7132C12.472 20.6567 12.6071 20.5463 12.877 20.3254C14.7557 18.7871 18.9999 14.7751 18.9999 9.9233C18.9999 8.08718 18.2625 6.32605 16.9497 5.02772C15.637 3.72939 13.8566 3 12.0001 3C10.1436 3 8.36301 3.7295 7.05025 5.02783C5.7375 6.32616 5 8.08674 5 9.92285Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M10 9C10 10.1046 10.8954 11 12 11C13.1046 1114 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Map":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 6V21M15 6L21 3V18L15 21M15 6L9 3M15 21L9 18M9 18L3 21V6L9 3M9 18V3"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "User":
			icon = (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.2166 19.3323C15.9349 17.9008 14.0727 17 12 17C9.92734 17 8.06492 17.9008 6.7832 19.3323M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
						stroke={`var(${colour})`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
			break;
		case "Pie":
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12M12 3C16.9706 3 21 7.02944 21 12M12 3V12M21 12H12M18 18.5L12 12"
						stroke={`var(${colour})`}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			);
		case "Info":
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
						stroke={`var(${colour})`}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			);

		default:
			icon = null;
	}

	return icon;
};

export default Icon;
