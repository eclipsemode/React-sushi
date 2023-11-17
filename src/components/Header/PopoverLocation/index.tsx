import React from 'react';
import Colors from '@shared/utils/Colors';
import SimpleButton from '@shared/UI/SimpleButton';
import {
  Popover,
  Stack,
  Typography,
} from '@mui/material';

export interface IPopoverLocationProps {
  openedPopover: boolean,
  popoverRef: React.RefObject<HTMLSpanElement>,
  handleClosePopover: () => void,
  currentBranch: string,
  handleAgreePopover: () => void,
  onCityPickClick: () => void
}

const PopoverLocation = ({openedPopover, popoverRef, handleClosePopover, currentBranch, handleAgreePopover, onCityPickClick}: IPopoverLocationProps) => {
  return (
    <Popover
      sx={{
        '& .MuiPaper-root': {
          marginTop: '5px',
          background: Colors.$rootCardBackground,
        },
      }}
      disableScrollLock={true}
      open={openedPopover}
      anchorEl={popoverRef?.current}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Stack sx={{ padding: '15px' }}>
        <Typography sx={{ p: 2, color: Colors.$rootText }}>
          Ваш город {currentBranch}?
        </Typography>
        <SimpleButton variant="contained" clickEvent={handleAgreePopover}>
          Подтвердить
        </SimpleButton>
        <SimpleButton variant="text" clickEvent={onCityPickClick}>
          Выбрать город
        </SimpleButton>
      </Stack>
    </Popover>
  );
};

export default PopoverLocation;