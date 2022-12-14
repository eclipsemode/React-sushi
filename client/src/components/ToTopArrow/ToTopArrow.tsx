import React from "react";
import styles from "./ToTopArrow.module.css";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const ToTopArrow: React.FC = () => {
  const [arrowHidden, setArrowHidden] = React.useState<boolean>(true);

  const isCheckOffset = React.useCallback(() => {
    window.scrollY > 100
      ? setArrowHidden(false)
      : setArrowHidden(true)
  }, []);

  React.useEffect(() => {
    isCheckOffset();
    window.addEventListener("scroll", () => {
      isCheckOffset();
    });
  }, [isCheckOffset]);

  return (
    arrowHidden ? null : <a href="#top"><BsFillArrowUpSquareFill className={styles.root} /></a>
  );
};

export default ToTopArrow;