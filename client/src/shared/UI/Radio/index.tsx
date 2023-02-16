import React from "react";
import styles from './index.module.css';

interface IRadioProps {
  register?: any,
  watch?: any,
  value?: number,
  defaultChecked?: boolean
}

const Radio: React.FC<IRadioProps> = ({ register, watch, value, defaultChecked }) => {
  return (
    <div className={styles.root}>
      <input id={`delivery-${value}`} type='radio' value={value} defaultChecked={defaultChecked} { ...register && { ...register("delivery-type") } } />
      <div className={styles.root__outer + ' ' + (+watch('delivery-type') === value ? styles.root__outer_checked : '')}><div className={styles.root__inner + ' ' + (+watch('delivery-type') === value ? styles.root__inner_checked : '')}></div></div>
      <label htmlFor={`delivery-${value}`}>Как можно скорее</label>
    </div>
  );
};

export default Radio;