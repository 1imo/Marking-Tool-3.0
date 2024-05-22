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
	cb: (...args: any[]) => void | Promise<void>;
	removeCb?: (...args: any[]) => void | Promise<void>;
	cbOptionals?: (...args: any[]) => void | Promise<void>;
	buttonText?: string[];
}

const InputGrid: FC<Props> = ({ type, data, remove, cb, removeCb, cbOptionals, buttonText }) => {
	const refs: RefObject<HTMLInputElement>[] = [];

	const next = () => {
		const values = refs.map((ref) => ref.current?.value);
		console.log("🚀 ~ next ~ values:", values);
		cb(values);
	};

	const back = () => {
		const values = refs.map((ref) => ref.current?.value);
		console.log("🚀 ~ back ~ values:", values);
		cbOptionals && cbOptionals(values);
	};

	return (
		<section className="input--grid">
			{data.map((item, index) => {
				const isArray = Array.isArray(item);

				const renderInput = (value: any, label?: string) => {
					const shouldRender = type === "double" || (type === "single" && index === 0);
					if (shouldRender) refs.push(useRef<HTMLInputElement>(null));
					if (shouldRender)
						console.log("🚀 ~ renderInput ~ refs", refs, item, value, label);

					return shouldRender ? (
						<div className="input--grid-row">
							{remove && removeCb && data.length > 0 && (
								<BtnIcon
									type="Remove"
									colour="--grey-one"
									cb={() => removeCb(isArray ? value : label ?? value)}
								/>
							)}
							<Input
								key={index}
								label={
									label && typeof label == "string"
										? label.replace(label?.[0], label?.[0].toUpperCase())
										: undefined
								}
								placeholder={`${value}`}
								inputType="text"
								r={refs[refs.length - 1]}
							/>
						</div>
					) : null;
				};

				return (
					<div key={index} className="input--grid-row">
						{isArray
							? item.map(renderInput)
							: Object.entries(item).map(([label, value]) =>
									renderInput(value, label)
							  )}
					</div>
				);
			})}
			<BtnGrid
				cbPrim={back}
				textPrim={buttonText?.[0] || "Back"}
				bgOne="--grey-three"
				colourOne="--grey-one"
				cbSec={next}
				bgTwo="--red"
				colourTwo="--white"
				textSec={buttonText?.[1] || "Continue"}
			/>
		</section>
	);
};

export default InputGrid;
