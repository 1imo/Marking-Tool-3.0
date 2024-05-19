import { FC, useState } from "react";
import Input, { Props as InputProps } from "../../Molecules/Input/Index";
import BtnIcon from "../../Molecules/Btn-Icon/Index";
import "./Styles.css";

type Type = "single" | "double";

interface Props {
	type: Type;
	data: any[];
	remove: boolean;
	cb: (newData: any[]) => void;
}

const InputGrid: FC<Props> = ({ type, data, remove, cb }) => {
	const adjustableValues = ["name", "lb"];

	return (
		<section className="input--grid">
			{data.map((field, index) => (
				<div key={index} className="input--grid-row">
					{remove && <BtnIcon type="Remove" colour="--grey-one" />}
					{Object.entries(field)
						.reverse()
						.map(([key, value], i) => {
							if (!adjustableValues.includes(key)) {
								return null; // Skip non-adjustable values
							}

							const isDoubleType = type === "double";
							const isSingleType = type === "single";
							const shouldRender =
								isDoubleType || (isSingleType && i === 0);

							return shouldRender ? (
								<Input
									key={`${index}-${i}-1`}
									placeholder={`${value}`}
									inputType={
										typeof value === "string"
											? "text"
											: "number"
									}
								/>
							) : null;
						})}
				</div>
			))}
		</section>
	);
};

export default InputGrid;
