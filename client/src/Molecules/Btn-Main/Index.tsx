import { FC } from "react";
import Text from "../../Atoms/Text";
import "./Style.css";

type BtnType = "submit";

interface Props {
	text: string;
	type?: BtnType;
	cb: (value: boolean) => void;
}

const BtnMain: FC<Props> = ({ text, cb, type = undefined }) => {
	return (
		<button
			className="btn-main"
			aria-label="region"
			onClick={() => cb(true)}
			type={type}
		>
			<Text size="two" text={text} colour="--grey-one" />
		</button>
	);
};

export default BtnMain;
