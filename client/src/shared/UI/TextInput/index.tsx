import React from "react";
import styles from './index.module.css';

interface ITextInputProps {
  value: string | number | undefined,
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type?: string
}

const TextInput: React.FC<ITextInputProps> = ({ value, onInput, type = 'text' }) => {
  return <input className={styles.root} type={type} value={value} onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput(e)} />
};

export default TextInput;