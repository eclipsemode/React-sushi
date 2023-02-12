import React from "react";
import styles from "./ToTopArrow.module.css";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { Affix } from "antd";

const ToTopArrow: React.FC = () => {
  const [arrowHidden, setArrowHidden] = React.useState<boolean>(true);

  const isCheckOffset = React.useCallback(() => {
    window.scrollY > 100
      ? setArrowHidden(false)
      : setArrowHidden(true);
  }, []);

  React.useEffect(() => {
    isCheckOffset();
    window.addEventListener("scroll", () => {
      isCheckOffset();
    });
  }, [isCheckOffset]);

  return (
    arrowHidden ? null : <Affix style={{ position: "absolute", bottom: "7em", right: "8em" }} offsetBottom={120}
                                onChange={(affixed) => console.log(affixed)}><a href="#top"><BsFillArrowUpSquareFill
      className={styles.root} /></a></Affix>
  );
};

export default ToTopArrow;