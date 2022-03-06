import React, { useState } from 'react';
import { NameAndValueInput } from '../types';

const useDropdownFocus = (
	dropdownOptions: string[],
	name?: string,
	callbackFunction?: (input: NameAndValueInput) => void
) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedVal, setSelectedVal] = useState<string>(dropdownOptions[0]);
	const [currentFocus, setCurrentFocus] = useState<number>(0);

	const toggleOpen = () => setIsOpen(!isOpen);

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
					: toggleOpen();
			currentFocus !== lastOption
				? setCurrentFocus(nextOption)
				: toggleOpen();
		} else if (e.key === ' ') {
			e.preventDefault();
			if (isOpen) {
				setCurrentFocus(initialFocus);
			}
			toggleOpen();
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (isOpen) {
				setSelectedVal(dropdownOptions[currentFocus]);
				// filter visible results based on dropdown selection
				if (callbackFunction && name)
					callbackFunction({
						name,
						value: dropdownOptions[currentFocus]
					});
			}
			toggleOpen();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setIsOpen(false);
		}
	};

	const handleClick = (option: string, index: number) => {
		setCurrentFocus(index);
		setSelectedVal(option);
		if (callbackFunction && name) callbackFunction({ name, value: option });
		toggleOpen();
	};

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
