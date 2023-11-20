import React from 'react';
import { Box, Stack, Tooltip } from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import styles from '@components/Account/Edit/index.module.scss';

interface IProps {
  validate: boolean;
}

const ActionBlock = ({ validate }: IProps) => {
  return (
    <Stack direction='row' className={styles.root__buttons}>
      <Tooltip
        title={validate && 'Изменения отсутствуют'}
        arrow
        placement='top'
      >
        <Box>
          <SimpleButton
            color={Colors.$mainColor}
            disabled={validate}
            variant='contained'
            type='reset'
          >
            Сбросить
          </SimpleButton>
        </Box>
      </Tooltip>
      <Tooltip
        title={validate && 'Изменения отсутствуют'}
        arrow
        placement='top'
      >
        <Box>
          <SimpleButton
            variant='contained'
            type='submit'
            disabled={validate}
          >
            Изменить
          </SimpleButton>
        </Box>
      </Tooltip>
    </Stack>
  );
};

export default ActionBlock;