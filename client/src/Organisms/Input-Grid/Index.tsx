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
}

const InputGrid: FC<Props> = ({ type, data, remove, cb, removeCb }) => {
	const refs: RefObject<HTMLInputElement>[] = [];

	console.log(type, data, remove, cb, removeCb);

	const next = () => {
		let values;
		if (type === "single") {
			values = refs.map((ref) => ref.current?.value);
		} else {
			values = refs.reduce((acc: Record<string, string | null>[], ref, i) => {
				if (i % 2 === 1) {
					acc.push({ [refs[i - 1].current?.value || ""]: ref.current?.value || null });
				}
				return acc;
			}, []);
		}

		refs.forEach((r) => {
			console.log(r?.current.value, "REFFFF");
		});

		console.log("🚀 ~ next ~ values:", values, refs);
		cb(values);
	};

	return (
		<section className="input--grid">
			{data.map((field, index) => (
				<div key={index} className="input--grid-row">
					{remove && removeCb && (
						<BtnIcon
							type="Remove"
							colour="--grey-one"
							cb={() => removeCb(field?.name)}
						/>
					)}
					{Object.values(field)
						.reverse()
						.map((value, i) => {
							const isDoubleType = type === "double";
							const isSingleType = type === "single";
							const shouldRender = isDoubleType || (isSingleType && i === 0);

							if (shouldRender) refs.push(useRef<HTMLInputElement>(null));

							console.log(value, typeof value, "VALUE");

							return shouldRender ? (
								<Input
									key={`${index}-${i}`}
									placeholder={`${value}`}
									inputType={"text"}
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
