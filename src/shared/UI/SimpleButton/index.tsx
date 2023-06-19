import React from "react";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/material";
import Colors from "../../../app/utils/Colors";

interface ISimpleButton {
  children: string,
  clickEvent?: () => void;
  type?: React.HTMLInputTypeAttribute;
  color?: string,
  variant?: "text" | "outlined" | "contained",
  disabled?: boolean
}

const SimpleButton: React.FC<ISimpleButton> = ({children, clickEvent, type , variant = 'outlined', color, disabled = false}) => {

  const buttonStyle: SxProps = {
    background: variant === 'contained' ? color ?? Colors.$rootTextActive : 'none',
    color: variant === 'contained' ? Colors.$rootText : (color ? color : Colors.$rootTextActive),
    border: `2px solid ${color ? color : Colors.$rootTextActive}`,
    cursor: "pointer",
    position: "relative",
    height: "48px",
    padding: "0 15px",
    lineHeight: "46px",
    textAlign: "center",
    borderRadius: "50px",
    textTransform: "uppercase",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "500",
    boxSizing: "border-box",
    opacity: "1",
    transition: "opacity ease .5s",
    whiteSpace: "nowrap",
    minWidth: "140px",
    maxWidth: '230px',
    width: '100%',
    textDecoration: "none",
    "&:hover": {
      color: Colors.$rootText,
      background: color ? color : Colors.$rootTextActive,
      border: `2px solid ${color ? color : Colors.$rootTextActive}`,
      filter: variant === 'contained' ? 'brightness(1.1)' : "none"
    },
    '&:disabled': {
      background: color ? color : Colors.$rootTextActive,
      color: Colors.$rootText,
      opacity:' 0.6',
    }
  };
  return (
    <Button type={type ===  'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'} variant={variant}
            disabled={disabled}
            children={children}
            sx={buttonStyle}
            onClick={clickEvent} defaultValue={children} />
  );
};

export default SimpleButton;