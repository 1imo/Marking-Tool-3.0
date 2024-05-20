import { FC, useRef, RefObject, useState } from "react";
import Input from "../../Molecules/Input/Index"; // Assuming Input and Props are properly imported
import BtnIcon from "../../Molecules/Btn-Icon/Index";
import BtnGrid from "../Btn-Grid/Index";
import "./Styles.css";

type Type = "single" | "double";

interface Props {
	type: Type;
	data: any[];
	remove: boolean;
	cb: () => void;
}

const InputGrid: FC<Props> = ({ type, data, remove, cb }) => {
	const refs: RefObject<HTMLInputElement>[] = [];

	const next = () => {
		let values;
		if (type === "single") {
			values = refs.map((ref) => ref.current?.value);
			console.log("Single Type Values:", values);
		} else {
			values = refs.reduce((acc: Record<string, string | null>[], ref, i) => {
				if (i % 2 === 1) {
					acc.push({ [refs[i - 1].current?.value || ""]: ref.current?.value || null });
				}
				return acc;
			}, []);
		}

		cb(values);
	};

	return (
		<section className="input--grid">
			{data.map((field, index) => (
				<div key={index} className="input--grid-row">
					{remove && (
						<BtnIcon
							type="Remove"
							colour="--grey-one"
							cb={(index) => data.splice(index, 1)}
						/>
					)}
					{Object.values(field)
						.reverse()
						.map((value, i) => {
							const isDoubleType = type === "double";
							const isSingleType = type === "single";
							const shouldRender = isDoubleType || (isSingleType && i === 0);

							if (shouldRender) refs.push(useRef<HTMLInputElement>(null));

							return shouldRender ? (
								<Input
									key={`${index}-${i}`}
									placeholder={`${value}`}
									inputType={typeof value === "string" ? "text" : "number"}
									r={refs[refs.length - 1]}
								/>
							) : null;
						})}
				</div>
			))}
			<BtnGrid
				cbPrim={() => {}}
				textPrim="Back"
				bgOne="--grey-three"
				colourOne="--grey-one"
				cbSec={next}
				bgTwo="--red"
				colourTwo="--white"
				textSec="Continue"
			/>
		</section>
	);
};

export default InputGrid;
