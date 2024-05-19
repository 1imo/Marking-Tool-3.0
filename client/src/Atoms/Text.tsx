import { FC } from "react";
import { usePadding, Padding } from "../Styles/Globals";

// Types
type TextSize = "one" | "two";
type TextColour =
	| "--grey-one"
	| "--grey-two"
	| "--grey-three"
	| "--grey-four"
	| "--white"
	| "--red";

// Props
interface Props {
	size: TextSize;
	text: string;
	colour?: TextColour;
	padding?: Padding;
}

// Returns a p tag
// Default colour of --grey-two
const Text: FC<Props> = ({ size, text, colour = "--grey-two", padding }) => {
	let classname;

	if (size === "one") {
		classname = "body-text-large";
	} else {
		classname = "body-text-small";
	}

	const paddingClasses = usePadding(padding, true);

	return (
		<p
			className={`${classname} ${paddingClasses}`}
			style={{ color: `var(${colour})` }}
		>
			{text}
		</p>
	);
};

export default Text;
