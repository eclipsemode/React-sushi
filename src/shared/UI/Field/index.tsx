import React from "react";
import styles from './index.module.scss';

interface IField {
  title: string;
  text: string | number;
}

const Field: React.FC<IField> = ({ title, text }) => {
  return (
    <div className={styles.root}>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};

export default Field;