import React from 'react';
import Input from '../components/Input';
import styles from '../styles/Nav.module.css';

type Props = {
	filterOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Nav = ({ filterOnChange }: Props) => {
	return (
		<div className={styles.nav}>
			<Input
				type="text"
				label="Search By Title"
				name="titleSearch"
				onChange={filterOnChange}
			/>
			<Input
				type="text"
				label="Search By Genre"
				name="genreSearch"
				onChange={filterOnChange}
			/>
		</div>
	);
};

export default Nav;
