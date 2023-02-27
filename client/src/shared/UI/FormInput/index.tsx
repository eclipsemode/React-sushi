import React from "react";
import InputMask from "react-input-mask";
import styles from "./index.module.css";

interface IFormInput {
  children: React.ReactNode;
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  mask?: string;
  maskChar?: string;
  value?: string | number;
  // register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  inputEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<IFormInput> = (props) => {
  return (
    <fieldset className={styles.root}>
      <label>{props.children}</label>
      <InputMask onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.inputEvent ? props.inputEvent(e) : null}
                 value={props.value ?? ""} mask={props.mask} maskChar={props.maskChar} type={props.type}
                 name={props.name} placeholder={props.placeholder} />
    </fieldset>
  );
};

export default FormInput;