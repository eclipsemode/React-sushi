import {InputAdornment, TextField, TextFieldProps} from "@mui/material";
import Colors from "../../../app/utils/Colors";
import {ValidationRule} from "react-hook-form";
import InputMask from "react-input-mask";
import React from "react";

interface IProps {
    variant?: 'outlined' | 'filled' | 'standard',
    label?: string,
    name?: string,
    error?: boolean,
    register?: any,
    required?: boolean,
    pattern?: ValidationRule<RegExp> | undefined,
    autoComplete?: 'on' | undefined,
    type?: React.HTMLInputTypeAttribute,
    minLength?: number | undefined,
    maxLength?: number | undefined
    endAdornment?: JSX.Element,
    validate?: (value: string) => boolean | undefined,

    inputMask?: boolean,
    mask?: string | undefined,
    maskChar?: string,
    placeholder?: string
    onChangeEvent?: (value: string) => void,
    value?: string | number,
    disabled?: boolean
}

const Input = ({
                   variant = 'standard',
                   label,
                   error,
                   name,
                   register,
                   required = false,
                   pattern = undefined,
                   autoComplete = undefined,
                   type = 'text',
                   minLength = undefined,
                   validate = undefined,
                   maxLength = undefined,
                   endAdornment = <></>,
                   inputMask = false,
                   mask = undefined,
                   maskChar = '',
                   placeholder,
                   onChangeEvent,
                   value = '',
                   disabled = false
               }: IProps) => {
    const renderEndAdornment = () => (
        <InputAdornment sx={{cursor: 'pointer'}} position="end">
            {endAdornment}
        </InputAdornment>
    )

    const renderInput = (props?: TextFieldProps) => (
        <TextField
            {...props}
            sx={{
                width: '100%',
                '& input': {
                    color: Colors.$rootText
                },
                '& > .MuiInput-underline::before': {
                    borderColor: Colors.$rootText,
                    borderWidth: '2px',
                },
                '& > .MuiInput-underline:hover::before': {
                    borderColor: Colors.$rootText + ' !important',
                },
                '& > .MuiInput-underline::after': {
                    borderColor: Colors.$rootTextActive,
                },

                '& > .MuiInput-underline.Mui-error::before': {
                    borderColor: Colors.$mainColor
                },

                '& >.Mui-error': {
                    background: Colors.$rootErrorBackground
                },

                '& > label': {
                    color: Colors.$infoColor
                },
                '& > label.Mui-focused': {
                    color: Colors.$rootText,

                    '& ~ div > input': {
                        background: 'none'
                    }
                },
                '& input.Mui-disabled': {
                    WebkitTextFillColor: Colors.$infoColor,
                    color: Colors.$infoColor,

                },
                '& div.Mui-disabled': {
                    '&::before': {
                        borderColor: Colors.$infoColor
                    }
                },
                '& svg': {
                    fill: Colors.$rootText,
                }
            }}
            label={label}
            error={error}
            inputProps={{
                name,
                type,
                autoComplete,
                placeholder,
                ...(!!register && register(name, {required, pattern, minLength, maxLength, validate}))
            }}
            InputProps={{
                endAdornment: renderEndAdornment()
            }}
            variant={variant}/>
    )

    return !inputMask ? renderInput(
        {
            onChange: (event) => !!onChangeEvent && onChangeEvent(event.target.value),
            ...(!!value ? {value} : null),
            disabled
        }
    ) : <InputMask
        value={!!value ? value : undefined}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => !!onChangeEvent && onChangeEvent(event.target.value)}
        mask={mask} maskChar={maskChar} disabled={disabled}>{() => renderInput()}</InputMask>
};

export default Input;