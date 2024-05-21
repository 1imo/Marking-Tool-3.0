import { FC, useMemo } from "react";
import "./Style.css";
import Text from "../../Atoms/Text";

type Selected = true | false;

interface Props {
	selected: Selected;
	text: string;
	callback?: (value: string) => void;
}

const LabelSelect: FC<Props> = ({ selected, text, callback }) => {
	const memoizedText = useMemo(() => text, [text]);

	return (
		<div
			className={`label-select ${selected == true ? "label-select--selected" : ""}`}
			aria-label="region"
			tabIndex={0}
			onClick={() => {
				callback && callback(memoizedText);
				console.log("CLICKED");
			}}
		>
			<Text
				size="two"
				text={memoizedText}
				colour={selected == true && callback ? "--grey-one" : "--grey-two"}
			/>
		</div>
	);
};

export default LabelSelect;
