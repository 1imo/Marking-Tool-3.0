import { useEffect, useState } from "react";

export const useDesktopScroll = (
	ref: React.RefObject<HTMLElement>,
	axis: "x" | "y"
) => {
	const [isDown, setIsDown] = useState(false);
	const [startPos, setStartPos] = useState(0);
	const [scrollPos, setScrollPos] = useState(0);

	useEffect(() => {
		const element = ref.current;
		if (element) {
			setScrollPos(axis === "x" ? element.scrollLeft : element.scrollTop);
		}
	}, [ref, axis]);

	const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		setIsDown(true);
		setStartPos(axis === "x" ? e.pageX : e.pageY);
		e.preventDefault();
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		if (!isDown) return;
		const movePos = axis === "x" ? e.pageX - startPos : e.pageY - startPos;
		const newScrollPos = scrollPos - movePos;
		if (ref.current) {
			if (axis === "x") {
				ref.current.scrollLeft = newScrollPos;
			} else {
				ref.current.scrollTop = newScrollPos;
			}
		}
		setScrollPos(newScrollPos);
	};

	const handleMouseUp = () => {
		setIsDown(false);
	};

	return {
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
	};
};

type PaddingSize = "small" | "medium" | "large";

export interface Padding {
	top?: PaddingSize;
	bottom?: PaddingSize;
	left?: PaddingSize;
	right?: PaddingSize;
}

export const usePadding = (
	padding: Padding | undefined,
	isParagraph: boolean = false
) => {
	const [paddingClasses, setPaddingClasses] = useState<string[]>([]);

	useEffect(() => {
		const classes: string[] = [];

		if (padding) {
			if (padding.top) {
				classes.push(
					isParagraph
						? `margin-top-${padding.top}`
						: `padding-top-${padding.top}`
				);
			}
			if (padding.bottom) {
				classes.push(
					isParagraph
						? `margin-bottom-${padding.bottom}`
						: `padding-bottom-${padding.bottom}`
				);
			}
			if (padding.left) {
				classes.push(
					isParagraph
						? `margin-left-${padding.left}`
						: `padding-left-${padding.left}`
				);
			}
			if (padding.right) {
				classes.push(
					isParagraph
						? `margin-right-${padding.right}`
						: `padding-right-${padding.right}`
				);
			}
		}

		setPaddingClasses(classes);
	}, [padding, isParagraph]);

	return paddingClasses.join(" ");
};
