import styles from './index.module.scss'

interface IProps {
		register?: any,
		required?: boolean,
		name?: string,
		children: JSX.Element | JSX.Element[]
}

const Select = ({register, required = false, name, children}: IProps) => {
		return (
				<select className={styles.root} {...register(name, { required })}>
						{children}
				</select>
		);
};

export default Select;