import { FC } from "react";
import Text from "../../Atoms/Text";
import "./Style.css";

type BtnType = "submit";
type Colour =
	| "--grey-one"
	| "--grey-two"
	| "--grey-three"
	| "--grey-four"
	| "--white"
	| "--red";

interface Props {
	text: string;
	type?: BtnType;
	cb: (value: boolean) => void;
	bg?: Colour;
	colour?: Colour;
}

const BtnMain: FC<Props> = ({
	text,
	cb,
	type = undefined,
	bg = "--grey-three",
	colour = "--grey-two",
}) => {
	return (
		<button
			className="btn-main"
			aria-label="region"
			onClick={() => cb(true)}
			type={type}
			style={{ background: `var(${bg})` }}
		>
			<Text size="two" text={text} colour={colour} />
		</button>
	);
};

export default BtnMain;
