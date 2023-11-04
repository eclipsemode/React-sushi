import React, { CSSProperties } from 'react';
import { Stack } from '@mui/material';
import Colors from '@shared/utils/Colors';
import styles from './index.module.scss';

interface IProps {
  register?: any;
  required?: boolean;
  name?: string;
  style?: CSSProperties;
}

const InputFile = ({ register, required = false, name, style }: IProps) => {
  return (
    <Stack
      sx={{ alignItems: 'flex-start', columnGap: '10px', rowGap: '10px' }}
      style={style}
      className={styles.root}
    >
      <span style={{ color: Colors.$rootText, fontSize: '18px' }}>
        Изображение
      </span>
      <input
        required={required}
        type="file"
        {...register(name)}
        style={{ color: Colors.$rootText }}
      />
    </Stack>
  );
};

export default InputFile;
