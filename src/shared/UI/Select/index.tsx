import styles from './index.module.scss'
import React, {CSSProperties} from "react";

interface IProps {
		register?: any,
		required?: boolean,
		name?: string,
		children: React.JSX.Element | React.JSX.Element[],
		defaultValue?: string,
		style?: CSSProperties,
		validate?: (value: string) => boolean | undefined,
}

const Select = ({register, required = false, name, children, defaultValue, style, validate}: IProps) => {
		return (
				<select className={styles.root} {...register(name, { required, validate })} defaultValue={defaultValue} style={style}>
						{children}
				</select>
		);
};

export default Select;