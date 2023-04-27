import React from "react";
import styles from './index.module.scss';

interface IRadioProps {
  register?: any,
  watch?: any,
  value?: number,
  defaultChecked?: boolean,
  children: React.ReactNode
}

const Radio: React.FC<IRadioProps> = ({ register, watch, value = 1, defaultChecked = false, children }) => {
  return (
    <div className={styles.root}>
      <input id={`delivery-${value}`} type='radio' value={value} defaultChecked={defaultChecked} { ...register && { ...register("deliveryTime", { valueAsNumber: true }) } } />
      <div className={styles.root__outer + ' ' + (watch && (+watch('deliveryTime') === value ? styles.root__outer_checked : ''))}><div className={styles.root__inner + ' ' + (watch &&( +watch('deliveryTime') === value ? styles.root__inner_checked : ''))}></div></div>
      <label htmlFor={`delivery-${value}`}>{children}</label>
    </div>
  );
};

export default Radio;