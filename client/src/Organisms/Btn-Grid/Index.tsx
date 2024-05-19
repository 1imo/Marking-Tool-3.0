import { FC } from "react";
import BtnMain from "../../Molecules/Btn-Main/Index";
import "./Styles.css";

type Colour =
	| "--grey-one"
	| "--grey-two"
	| "--grey-three"
	| "--grey-four"
	| "--white"
	| "--red";

interface Props {
	textPrim: string;
	cbPrim: () => void;
	bgOne?: Colour;
	colourOne?: Colour;
	textSec: string;
	cbSec: () => void;
	bgTwo?: Colour;
	colourTwo?: Colour;
}

const BtnGrid: FC<Props> = ({
	textPrim,
	cbPrim,
	bgOne,
	bgTwo,
	colourOne,
	colourTwo,
	textSec,
	cbSec,
}) => {
	return (
		<section className="btn-grid">
			<BtnMain
				text={textPrim}
				cb={cbPrim}
				bg={bgOne}
				colour={colourOne}
			/>
			<BtnMain text={textSec} cb={cbSec} bg={bgTwo} colour={colourTwo} />
		</section>
	);
};

export default BtnGrid;
