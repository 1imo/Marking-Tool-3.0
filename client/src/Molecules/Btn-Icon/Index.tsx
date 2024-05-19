import { FC } from "react";
import Icon from "../../Atoms/Icons";
import "./Style.css";
import { useNavigate } from "react-router";

// Types
type Icon = "Basket" | "Back";
type Colour =
	| "--grey-one"
	| "--grey-two"
	| "--grey-three"
	| "--grey-four"
	| "--white"
	| "--red";

// Props
interface Props {
	type: Icon;
	colour?: Colour;
}

const BtnIcon: FC<Props> = ({ type, colour = "--grey-one" }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (type == "Back") {
			navigate(-1);
		} else if (type == "Basket") {
			navigate("/basket");
		}
	};

	let icon;

	if (type == "Basket") {
		icon = <Icon type="Basket" colour={colour} />;
	} else {
		icon = <Icon type="Back" colour={colour} />;
	}

	return (
		<button className="btn-icon" onClick={handleClick}>
			{icon}
		</button>
	);
};

export default BtnIcon;
