import styles from './index.module.scss'
import React from "react";

interface IProps {
		register?: any,
		required?: boolean,
		name?: string,
		children: React.JSX.Element | React.JSX.Element[],
		defaultValue?: string
}

const Select = ({register, required = false, name, children, defaultValue}: IProps) => {
		return (
				<select className={styles.root} {...register(name, { required })} defaultValue={defaultValue}>
						{children}
				</select>
		);
};

export default Select;