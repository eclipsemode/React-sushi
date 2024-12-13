import {InputAdornment, SxProps, TextField} from '@mui/material';
import Colors from '@shared/utils/Colors';
import {ValidationRule} from 'react-hook-form';
import {useMaskito} from '@maskito/react';
import React, {CSSProperties} from 'react';

import optionsPhone from '@shared/UI/CustomInput/maskPhone'
import optionsDate from "@shared/UI/CustomInput/maskDate";
import optionsCode from "@shared/UI/CustomInput/maskCode"
import {MaskitoOptions} from "@maskito/core";

type TMaskType = 'default' | 'phone' | 'code' | 'date';

interface IProps {
    variant?: 'outlined' | 'filled' | 'standard';
    label?: string;
    name?: string;
    error?: boolean;
    register?: any;
    required?: boolean;
    pattern?: ValidationRule<RegExp> | undefined;
    autoComplete?: 'on' | undefined;
    type?: React.HTMLInputTypeAttribute;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    endAdornment?: React.ReactNode;
    validate?: (value: string) => boolean | undefined;
    style?: CSSProperties;
    className?: string;
    inputMask?: boolean;
    maskType?: TMaskType
    placeholder?: string;
    onChangeEvent?: (value: string) => void;
    value?: string | number;
    disabled?: boolean;
    defaultValue?: string | number | Date | null;
}

const CustomInput = ({
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
                         placeholder,
                         onChangeEvent,
                         value,
                         disabled = false,
                         defaultValue,
                         style,
                         className,
                         maskType = 'default',
                     }: IProps) => {

    const maskOpts = new Map<TMaskType, MaskitoOptions | null>([
        ['date', optionsDate],
        ['phone', optionsPhone],
        ['code', optionsCode],
        ['default', null]
    ])

    const inputRef = useMaskito({
        options: maskOpts.get(maskType) || null,
    });

    const renderEndAdornment = () => (
        <InputAdornment sx={{cursor: 'pointer'}} position="end">
            {endAdornment}
        </InputAdornment>
    );

    const stylesInput: SxProps = {
        width: '100%',
        '& input': {
            color: Colors.$rootText,
        },
        ' input[type=date]::-webkit-calendar-picker-indicator': {
            filter: 'invert(1)',
        },
        '& > .MuiInput-underline::before': {
            borderColor: Colors.$rootText,
            borderBottomWidth: '2px',
        },
        '& > .MuiInput-underline:hover::before': {
            borderColor: Colors.$rootText + ' !important',
        },
        '& > .MuiInput-underline::after': {
            borderColor: Colors.$rootTextActive,
        },

        '& > .MuiInput-underline.Mui-error::before': {
            borderColor: Colors.$mainColor,
        },

        '& >.Mui-error': {
            background: Colors.$rootErrorBackground,
        },

        '& > label': {
            color: Colors.$infoColor,
        },
        '& > label.Mui-focused': {
            color: Colors.$rootText,

            '& ~ div > input': {
                background: 'none',
            },
        },
        '& > label.Mui-disabled': {
            color: Colors.$infoColor,
        },
        '& input.Mui-disabled': {
            WebkitTextFillColor: Colors.$infoColor,
            color: Colors.$infoColor,
        },
        '& div.Mui-disabled': {
            '&::before': {
                borderColor: Colors.$infoColor,
            },
        },
        '& svg': {
            fill: Colors.$rootText,
        },
    };

    const renderInput = () => (
        <TextField
            sx={stylesInput}
            style={style}
            className={className}
            defaultValue={defaultValue}
            value={value}
            label={label}
            required={required}
            disabled={disabled}
            error={error}
            onChange={(event) => !!onChangeEvent && onChangeEvent(event.target.value)}
            inputProps={{
                name,
                type,
                autoComplete,
                placeholder,
                ...(!!register &&
                    register(name, {pattern, minLength, maxLength, validate})),
            }}
            InputProps={{
                endAdornment: renderEndAdornment(),
            }}
            variant={variant}
        />
    );

    const renderMaskInput = () => (
        <TextField
            sx={stylesInput}
            style={style}
            ref={inputRef}
            defaultValue={defaultValue}
            className={className}
            value={value}
            label={label}
            required={required}
            disabled={disabled}
            error={error}
            onChange={(event) => !!onChangeEvent && onChangeEvent(event.target.value)}
            inputProps={{
                name,
                type,
                autoComplete,
                placeholder,
                ...(!!register &&
                    register(name, {pattern, minLength, maxLength, validate})),
            }}
            InputProps={{
                endAdornment: renderEndAdornment(),
            }}
            variant={variant}
        />
    );

    return !inputMask ? renderInput() : renderMaskInput();
};

export default CustomInput;
