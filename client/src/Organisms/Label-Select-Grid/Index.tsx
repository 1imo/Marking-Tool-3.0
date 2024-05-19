import { FC, useState } from "react";
import LabelSelect from "../../Molecules/Label-Select/Index";
import "./Style.css";

interface Props {
	options: Array<string>;
	selected?: string;
	callback?: (selected: string) => void;
}

const LabelSelectGrid: FC<Props> = ({ options, selected, callback }) => {
	return (
		<div className="label-select-grid">
			{options.map((option, index) => (
				<LabelSelect
					key={index}
					selected={
						(selected == undefined ?? true) || option == selected
					}
					text={option}
					callback={callback}
				/>
			))}
		</div>
	);
};

export default LabelSelectGrid;
