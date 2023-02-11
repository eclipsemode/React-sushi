import React from "react";
import styles from './index.module.css'

interface IFormInput {
  children: React.ReactNode;
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
}

const FormInput: React.FC<IFormInput> = (props) => {
  return (
    <fieldset className={styles.root}>
      <label htmlFor={props.name}>{props.children}</label>
      <input type={props.type} name={props.name} placeholder={props.placeholder} />
    </fieldset>
  );
};

export default FormInput;