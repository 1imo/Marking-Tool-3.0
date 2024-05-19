import { FC } from "react";
import Input from "../../Molecules/Input/Index";
import BtnIcon from "../../Molecules/Btn-Icon/Index";
import "./Style.css";

// Types
type Left = "Search" | "Back";
type Right = "Basket";

interface Props {
	left?: Left;
	right?: Right;
}

const NavBar: FC<Props> = ({ left, right }) => {
	return (
		<nav className="nav-bar">
			<div className="nav-bar__left">
				{left === "Search" ? (
					<Input type="Search" placeholder="Search" />
				) : (
					<BtnIcon type="Back" />
				)}
			</div>

			<div className="nav-bar__right">
				{right === "Basket" ? <BtnIcon type="Basket" /> : null}
			</div>
		</nav>
	);
};

export default NavBar;
