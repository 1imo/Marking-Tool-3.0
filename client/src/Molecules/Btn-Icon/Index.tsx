import { FC } from "react";
import Icon from "../../Atoms/Icons";
import "./Style.css";
import { useNavigate } from "react-router";

// Types
type Icon = "Basket" | "Back" | "Remove";
type Colour = "--grey-one" | "--grey-two" | "--grey-three" | "--grey-four" | "--white" | "--red";

// Props
interface Props {
	type: Icon;
	colour?: Colour;
	cb?: (ord: number) => void;
}

const BtnIcon: FC<Props> = ({ type, colour = "--grey-one", cb }) => {
	let icon;

	switch (type) {
		case "Basket":
			icon = <Icon type="Basket" colour={colour} />;
		case "Back":
			icon = <Icon type="Back" colour={colour} />;
		case "Remove":
			icon = <Icon type="Remove" colour={colour} />;
	}

	return (
		<button className="btn-icon" onClick={cb}>
			{icon}
		</button>
	);
};

export default BtnIcon;
