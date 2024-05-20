import { FC } from "react";
import LabelSelect from "../../Molecules/Label-Select/Index";
import "./Style.css";
import { Mode } from "../../Services/Interfaces";

interface Props {
	options: Array<string | Mode>;
	selected?: string | Mode;
	callback?: (selected: string | Mode) => void;
}

const LabelSelectGrid: FC<Props> = ({ options, selected, callback }) => {
	return (
		<div className="label-select-grid">
			{options.map((option, index) => (
				<LabelSelect
					key={index}
					selected={selected === undefined || option === selected}
					text={option.toString()}
					callback={() => callback?.(option)}
				/>
			))}
		</div>
	);
};

export default LabelSelectGrid;
