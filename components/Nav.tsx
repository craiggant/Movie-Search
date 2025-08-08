import React, { useMemo } from 'react';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import styles from '../styles/Nav.module.css';
import { Genre, NameAndValueInput } from '../types';

type Props = {
	filterOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	customFilter: (input: NameAndValueInput) => void;
	options: Genre[];
};

const Nav = ({ options, filterOnChange, customFilter }: Props) => {
	const flattenedGenres = useMemo(
		() => options.map(({ name }) => name),
		[options]
	);
	return (
		<div className={styles.nav}>
			<Input
				type="text"
				label="Search By Title"
				name="titleSearch"
				placeholder="Type to search..."
				onChange={filterOnChange}
			/>
			<Dropdown
				label="Filter By Genre"
				name="genreSearch"
				options={flattenedGenres}
				customFilter={customFilter}
			/>
		</div>
	);
};

export default Nav;
