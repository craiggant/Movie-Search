import React, { useEffect, useRef, LiHTMLAttributes } from 'react';
import styles from '../styles/Dropdown.module.css';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
	option: string;
	focus: boolean;
	index: number;
	handleClick: (option: string, index: number) => void;
}

const Item: React.FC<Props> = ({
	option,
	focus,
	index,
	handleClick,
	...rest
}) => {
	const ref = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (focus) {
			ref.current?.focus();
		}
	}, [focus]);

	const handleLiClick = () => handleClick(option, index);

	return (
		<li
			ref={ref}
			className={styles.listItem}
			tabIndex={focus ? 0 : -1}
			onClick={handleLiClick}
			{...rest}
		>
			{option}
		</li>
	);
};

export default Item;
