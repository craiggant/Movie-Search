import React from 'react';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import styles from '../styles/Nav.module.css';

type Props = {
	filterOnChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	options: string[];
};

const Nav = ({ options, filterOnChange }: Props) => {
	return (
		<div className={styles.nav}>
			<Input
				type="text"
				label="Search By Title"
				name="titleSearch"
				onChange={filterOnChange}
			/>
			<Dropdown
				label="Filter By Genre"
				name="genreSearch"
				options={options}
				onChange={filterOnChange}
			/>
		</div>
	);
};

export default Nav;
