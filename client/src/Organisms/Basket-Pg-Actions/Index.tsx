import { FC, useEffect, useState } from "react";
import BtnMain from "../../Molecules/Btn-Main/Index";
import Text from "../../Atoms/Text";
import "./Style.css";
import Heading from "../../Atoms/Headings";

interface Props {
	price: number;
	callback: (callback: number) => void;
}

const BasketPgActions: FC<Props> = ({ price, callback }) => {
	// Quanity of the product selected
	const [quanitity, setQuantity] = useState<number>(1);
	// User has clicked the button
	const [okay, setOkay] = useState<boolean>(false);

	// Push the quantity to the parent component on button click
	useEffect(() => {
		if (okay) {
			callback(quanitity);
		}
	}, [okay]);

	return (
		<div className="basket-pg__actions">
			<div className="basket-pg__actions__top">
				<Heading
					type="Primary"
					size="three"
					text="Total"
					colour="--grey-one"
				/>
				<Text
					size="one"
					text={`£${price * quanitity}`}
					colour="--grey-two"
				/>
			</div>

			<BtnMain text="Continue" cb={setOkay} />
		</div>
	);
};

export default BasketPgActions;
