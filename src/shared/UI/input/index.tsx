import { InputAdornment, SxProps, TextField } from '@mui/material';
import Colors from '@shared/utils/Colors';
import { ValidationRule } from 'react-hook-form';
import InputMask from 'react-input-mask'
import React, { CSSProperties, PropsWithChildren } from 'react';

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
  mask?: string | undefined;
  maskChar?: string;
  placeholder?: string;
  onChangeEvent?: (value: string) => void;
  value?: string | number;
  disabled?: boolean;
  defaultValue?: string | number | Date | null;
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
  value,
  disabled = false,
  defaultValue,
  style,
  className,
}: IProps) => {
  const renderEndAdornment = () => (
    <InputAdornment sx={{ cursor: 'pointer' }} position="end">
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
      borderWidth: '2px',
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
          register(name, { pattern, minLength, maxLength, validate })),
      }}
      InputProps={{
        endAdornment: renderEndAdornment(),
      }}
      variant={variant}
    />
  );

  const renderMaskInput = () => (
    <InputMask
      value={value}
      className={className}
      defaultValue={defaultValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        !!onChangeEvent && onChangeEvent(event.target.value)
      }
      mask={mask}
      maskChar={maskChar}
      disabled={disabled}
    >
      {(inputProps: PropsWithChildren) => (
        <TextField
          {...inputProps}
          sx={stylesInput}
          label={label}
          required={required}
          disabled={disabled}
          error={error}
          inputProps={{
            name,
            type,
            autoComplete,
            placeholder,
            ...(!!register &&
              register(name, { pattern, minLength, maxLength, validate })),
          }}
          InputProps={{
            endAdornment: renderEndAdornment(),
          }}
          variant={variant}
        />
      )}
    </InputMask>
  );

  return !inputMask ? renderInput() : renderMaskInput();
};

export default Input;
