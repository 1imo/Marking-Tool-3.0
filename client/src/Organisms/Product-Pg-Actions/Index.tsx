import { FC, useEffect, useState } from "react";
import BtnMain from "../../Molecules/Btn-Main/Index";
import QuantitySelect from "../../Molecules/Quantity-Select/Index";
import Text from "../../Atoms/Text";
import "./Style.css";

interface Props {
	price: number;
	callback: (callback: number) => void;
}

// I am still not entirely sure how to go about adding to the basket
// Whether I should do it in a service layer here
// Or if I should do it in the parent component
const ProductPgActions: FC<Props> = ({ price, callback }) => {
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
		<div className="product-pg__actions">
			<div className="product-pg__actions__top">
				<QuantitySelect
					wrapper={false}
					quantity={quanitity}
					setQuanitity={setQuantity}
				/>
				<Text
					size="one"
					text={`£${price * quanitity}`}
					colour="--grey-two"
				/>
			</div>

			<BtnMain text="Proceed to Basket" cb={setOkay} />
		</div>
	);
};

export default ProductPgActions;
