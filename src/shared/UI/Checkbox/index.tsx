import React, {CSSProperties} from "react";
import styles from "./index.module.scss";
import {CheckOutlined} from "@ant-design/icons";
import {IFormData} from "@store/features/order/model";

interface ICheckbox {
    children: React.ReactNode;
    name: string;
    register?: any;
    checked?: boolean;
    errors?: IFormData | any;
    style?: CSSProperties;
    onChangeEvent?: (value: boolean) => void;
    required?: boolean,
    validate?: (value: boolean) => void
}

const Checkbox: React.FC<ICheckbox> = ({required = true, ...props}) => {
    const [checked, setChecked] = React.useState<boolean>(props.checked ?? false);

    return (
        <div className={styles.root} style={props.style}>
            <input required={required} {...props.register && {...props.register(props.name, { validate: props.validate})}} onChange={(e) => {
                setChecked(e.target.checked);
                if (props.onChangeEvent) {
                    props.onChangeEvent(e.target.checked);
                }
            }} defaultChecked={props.checked} type="checkbox" className={styles.root__input} id={props.name}/>
            <label htmlFor={props.name}
                   className={props.errors && (props.errors[props.name] && styles.root__input_invalid)}>
                <div>{props.children}</div>
            </label>
            <CheckOutlined style={checked ? {display: 'initial'} : {display: "none"}}/>
        </div>
    );
};

export default Checkbox;