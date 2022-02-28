import React, {InputHTMLAttributes} from 'react'
import styles from "../styles/Input.module.css"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
};

const Input: React.FC<Props> = ({ name, label, ...rest }) => {
	return (
		<div className={styles.inputGroup}>
			<input
				className={styles.input}
        id={name}
        name={name}
        placeholder={label}
        {...rest}
			/>
      <label htmlFor={name} className={styles.label}>{label}</label>

		</div>
	);
};

export default Input
