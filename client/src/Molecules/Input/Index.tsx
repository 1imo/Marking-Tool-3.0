import { FC, RefObject, useState, useRef, useEffect } from "react";
import Icon from "../../Atoms/Icons";
import "./Style.css";
import Text from "../../Atoms/Text";

// Types
type Icon = "Search" | "User" | "Email" | "House" | "Pin" | "Map";
type InputType = "text" | "email" | "number" | "password";

// Props
interface Props {
	type: Icon;
	placeholder: string;
	label?: string;
	required?: Boolean;
	name?: string;
	inputType?: InputType;
}

const Input: FC<Props> = ({
	type,
	placeholder,
	label,
	required = false,
	name = undefined,
	inputType = "text",
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	let icon;

	switch (type) {
		case "Search":
			icon = <Icon type="Search" colour="--grey-one" />;
			break;
		case "User":
			icon = <Icon type="User" colour="--grey-two" />;
			break;
		case "Email":
			icon = <Icon type="Email" colour="--grey-two" />;
			break;
		case "House":
			icon = <Icon type="House" colour="--grey-two" />;
			break;
		case "Pin":
			icon = <Icon type="Pin" colour="--grey-two" />;
			break;
		case "Map":
			icon = <Icon type="Map" colour="--grey-two" />;
			break;
	}

	useEffect(() => {
		const handleInputChange = () => {
			if (inputRef.current?.value && inputRef.current.value.length > 0) {
				containerRef.current?.classList.add(
					"input__container--not-empty"
				);
			} else {
				containerRef.current?.classList.remove(
					"input__container--not-empty"
				);
			}
		};

		inputRef.current?.addEventListener("input", handleInputChange);

		return () => {
			inputRef.current?.removeEventListener("input", handleInputChange);
		};
	}, []);

	return (
		<section className="input">
			{label ? (
				<div>
					{label ? (
						<Text
							size="two"
							text={String(label)}
							colour="--grey-one"
						/>
					) : null}
					{required ? (
						<Text size="two" colour="--red" text="*" />
					) : null}
				</div>
			) : null}

			<div
				className={`input__container ${
					type == "Search" ? "input__container--search" : ""
				}`}
				aria-label="region"
				ref={containerRef}
			>
				{icon}
				<input
					placeholder={placeholder}
					ref={inputRef}
					required={required ? true : false}
					name={name}
					type={inputType}
				/>
			</div>
		</section>
	);
};

export default Input;
