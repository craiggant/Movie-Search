import React, { useRef, SelectHTMLAttributes } from 'react';
import Item from './Item';
import useClickOutside from '../hooks/useClickOutside';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
	} = useDropdownFocus(options);

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
				<label className={styles.label}>{label}</label>
				<span>{selectedVal}</span>
				<span aria-hidden="true">
					<FontAwesomeIcon
						icon={isOpen ? faChevronUp : faChevronDown}
					/>
				</span>
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
