import React from "react";
import styles from './index.module.css'

interface IBlockForm {
  children: React.ReactNode
}

const BlockForm: React.FC<IBlockForm> = (props) => {
  return (
    <section className={styles.root}>
      {
        props.children
      }
    </section>
  );
};

export default BlockForm;