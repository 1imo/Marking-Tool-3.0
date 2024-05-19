import { FC } from "react";
import Icon from "../../Atoms/Icons";
import "./Style.css";
import Text from "../../Atoms/Text";

type Wrapper = true | false;

type WrapperColour =
	| "--grey-one"
	| "--grey-two"
	| "--grey-three"
	| "--grey-four"
	| "--white"
	| "--red";

interface Props {
	wrapper: Wrapper;
	colour?: WrapperColour;
	quantity: number;
	setQuanitity: (value: number) => void;
}

const QuantitySelect: FC<Props> = ({
	wrapper,
	colour = "--grey-three",
	quantity,
	setQuanitity,
}) => {
	const increment = () => {
		setQuanitity(quantity + 1);
	};

	const decrement = () => {
		setQuanitity(quantity - 1);
	};

	return (
		<div
			className={`quantity-select ${
				wrapper ? "quantity-select--wrapper" : ""
			}`}
			style={wrapper ? { backgroundColor: `var(${colour})` } : undefined}
			aria-label="region"
		>
			<button
				className="quantity-select__button"
				onClick={decrement}
				tabIndex={0}
				disabled={quantity === 1}
				aria-label="Decrement quantity"
			>
				<Icon type="Remove" colour="--grey-one" />
			</button>
			<div className="quantity-select__quantity">
				<Text size="two" text={String(quantity)} colour="--grey-one" />
			</div>
			<button
				className="quantity-select__button"
				onClick={increment}
				tabIndex={0}
				aria-label="Increment quantity"
			>
				<Icon type="Add" colour="--grey-one" />
			</button>
		</div>
	);
};

export default QuantitySelect;
