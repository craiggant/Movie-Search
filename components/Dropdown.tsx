import React, { useState, SelectHTMLAttributes } from 'react';
import Item from './Item';
import styles from '../styles/Dropdown.module.css';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	label: string;
	options: string[];
}

const Select: React.FC<Props> = ({ name, label, options, ...rest }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedVal, setSelectedVal] = useState<string>(label);
	const [currentFocus, setCurrentFocus] = useState<number>(0);

	const firstOption = 0;
	const lastOption = options.length - 1;
	const nextOption = currentFocus + 1;
	const prevOption = currentFocus - 1;

	const handleKeyDown = (e: any) => {
		const initialFocus = currentFocus;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setCurrentFocus(
				currentFocus === lastOption ? firstOption : nextOption
			);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setCurrentFocus(
				currentFocus === firstOption ? lastOption : prevOption
			);
		} else if (e.key === 'Tab') {
			if (e.shiftKey)
				return currentFocus !== firstOption
					? setCurrentFocus(prevOption)
					: setIsOpen(!isOpen);
			currentFocus !== lastOption
				? setCurrentFocus(nextOption)
				: setIsOpen(!isOpen);
		} else if (e.key === ' ') {
			e.preventDefault();
			if (isOpen) {
				setCurrentFocus(initialFocus);
			}
			setIsOpen(!isOpen);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (isOpen) {
				setSelectedVal(options[currentFocus]);
			}
			setIsOpen(!isOpen);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setIsOpen(false);
		}
	};

	const handleClick = (option: string, index: number) => {
		setCurrentFocus(index);
		setSelectedVal(option);
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.container}>
			<button
				role=""
				aria-haspopup="true"
				aria-expanded={isOpen}
				className={styles.header}
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={handleKeyDown}
			>
				{selectedVal || label}
				<span aria-hidden="true">&#x25be;</span>
			</button>
			{isOpen && (
				<ul className={styles.dropdown}>
					{options.map((option, index) => (
						<Item
							key={index}
							index={index}
							className={styles.listItem}
							focus={currentFocus === index}
							onKeyDown={handleKeyDown}
							handleClick={handleClick}
							role="button"
							option={option}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;
