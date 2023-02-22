import React from "react";
import styles from "./index.module.css";
import { IFormInputs } from "features/order/ui/DeliveryForm";
import { CheckOutlined } from "@ant-design/icons";

interface ICheckbox {
  children: React.ReactNode;
  name: string;
  register?: any;
  checked?: boolean;
  errors?: IFormInputs | any;
}

const Checkbox: React.FC<ICheckbox> = (props) => {
  return (
    <div className={styles.root}>
      <input {...props.register && { ...props.register(props.name, { required: true }) }} defaultChecked={props.checked} type="checkbox" className={styles.root__input} id={props.name} />
      <label htmlFor={props.name} className={props.errors && (props.errors[props.name] && styles.root__input_invalid)}><div>{props.children}</div></label>
      <CheckOutlined />
    </div>
  );
};

export default Checkbox;