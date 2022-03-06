import React, { useState } from 'react';

const useDropdownFocus = (
	dropdownOptions: string[],
	name: string,
	customFilter: (input: { name: string; value: string }) => void
) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedVal, setSelectedVal] = useState<string>(dropdownOptions[0]);
	const [currentFocus, setCurrentFocus] = useState<number>(0);

	const firstOption = 0;
	const lastOption = dropdownOptions.length - 1;
	const nextOption = currentFocus + 1;
	const prevOption = currentFocus - 1;

	const handleKeyDown = (e: React.KeyboardEvent) => {
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
				setSelectedVal(dropdownOptions[currentFocus]);
				customFilter({
					name,
					value: dropdownOptions[currentFocus]
				});
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
		customFilter({ name, value: option });
		setIsOpen(!isOpen);
	};

	const toggleOpen = () => setIsOpen(!isOpen);

	return {
		currentFocus,
		isOpen,
		selectedVal,
		handleKeyDown,
		toggleOpen,
		handleClick
	};
};

export default useDropdownFocus;
