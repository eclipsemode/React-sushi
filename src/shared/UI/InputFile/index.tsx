import React, { CSSProperties } from 'react';
import { Stack } from '@mui/material';
import Colors from '@shared/utils/Colors';
import styles from './index.module.scss';
import { UseFormRegister } from 'react-hook-form';

interface IProps {
  register?: UseFormRegister<any>;
  required?: boolean;
  name: string;
  style?: CSSProperties;
}

export const MAX_SIZE_FILE = 5242047;

const InputFile = ({ register, required = false, name, style }: IProps) => {
  return (
    <Stack
      sx={{ alignItems: 'flex-start', columnGap: '10px', rowGap: '10px' }}
      style={style}
      className={styles.root}
    >
      <input
        required={required}
        type="file"
        accept="image/*"
        size={MAX_SIZE_FILE}
        {...(register
          ? register(name, {
              validate: (value: FileList) => value[0].size < MAX_SIZE_FILE,
            })
          : null)}
        style={{ color: Colors.$rootText }}
      />
    </Stack>
  );
};

export default InputFile;
