import React, { useRef, SelectHTMLAttributes } from 'react';
import Item from './Item';
import useClickOutside from '../hooks/useClickOutside';
import styles from '../styles/Dropdown.module.css';
import useDropdownFocus from '../hooks/useDropdownFocus';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	label: string;
	options: string[];
}

const Select: React.FC<Props> = ({ name, label, options }) => {
	const ref = useRef(null);
	const {
		currentFocus,
		isOpen,
		selectedVal,
		handleKeyDown,
		toggleOpen,
		handleClick
	} = useDropdownFocus(options, label);

	const handleClickOutside = (): void => {
		if (isOpen) toggleOpen();
	};

	useClickOutside(ref, handleClickOutside);

	return (
		<div className={styles.container} ref={ref}>
			<button
				role="button"
				aria-haspopup="true"
				aria-label={label}
				aria-expanded={isOpen}
				className={styles.header}
				onClick={toggleOpen}
				onKeyDown={handleKeyDown}
			>
				{selectedVal || label}
				<span aria-hidden="true">&#x25be;</span>
			</button>
			{isOpen && (
				<ul className={styles.dropdown} role="menu">
					{options.map((option, index) => (
						<Item
							role="menuitem"
							key={index}
							index={index}
							className={styles.listItem}
							focus={currentFocus === index}
							onKeyDown={handleKeyDown}
							handleClick={handleClick}
							option={option}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;
