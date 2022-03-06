import React from 'react';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import styles from '../styles/Nav.module.css';

type Props = {
	filterOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	customFilter: (input: { name: string; value: string }) => void;
	options: string[];
};

const Nav = ({ options, filterOnChange, customFilter }: Props) => {
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
				options={options}
				customFilter={customFilter}
			/>
		</div>
	);
};

export default Nav;
