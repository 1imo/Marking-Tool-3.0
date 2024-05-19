import { FC } from "react";
import Input from "../../Molecules/Input/Index";
import BtnIcon from "../../Molecules/Btn-Icon/Index";
import "./Style.css";
import Heading from "../../Atoms/Headings";

// Types
type Left = "Search" | "Back";
type Right = "Basket";

interface Props {
	left?: Left;
	right?: Right;
}

const NavBar: FC<Props> = () => {
	return (
		<nav className="nav-bar">
			<div className="nav-bar__left">
				<Heading type="Primary" size="one" text="Mark30" />
			</div>
		</nav>
	);
};

export default NavBar;
