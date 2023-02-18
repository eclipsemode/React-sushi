import React, { ForwardedRef } from "react";
import styles from './index.module.css'

interface IModalWindow {
  refModal?: ForwardedRef<HTMLDivElement>
  listArray: {text: string, icon?: JSX.Element, clickEvent?: CallableFunction}[]
}

const ModalWindow: React.FC<IModalWindow> = (props) => {
  return (
    <div ref={props.refModal ? props.refModal : null} className={styles.root}>
      <ul>
        {
          props.listArray.map((element, index) => (
            <li key={`${index}${element.text}`} onClick={element.clickEvent && element.clickEvent()}>{element.icon && element.icon}<span>{element.text}</span></li>
          ))
        }
      </ul>
    </div>
  );
};

export default ModalWindow;