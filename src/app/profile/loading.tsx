'use client';
import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import { useAppSelector } from '@store/hooks';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import { selectUser } from '@store/features/user';

const Loading = () => {
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const { isAuth } = useAppSelector(selectUser);
  const renderNotAuthLoading = () => (
    <span className="container">
      <Skeleton
        animation="wave"
        style={{
          maxWidth: '450px',
          width: '100%',
          height: '250px',
          transform: 'none',
          margin: '0 auto',
        }}
      />
    </span>
  );

  const renderAuthLoading = () => (
    <Stack rowGap="1rem" className="container">
      <span>
        <Skeleton
          animation="wave"
          sx={{ transform: 'none', height: '24px', width: '100%' }}
        />
      </span>

      {deviceType === DeviceType.DESKTOP ? (
        <Stack direction="row" columnGap="1rem">
          <span style={{ flex: '1' }}>
            <Skeleton
              animation="wave"
              sx={{
                transform: 'none',
                height: '500px',
                maxWidth: '300px',
                width: '100%',
              }}
            />
          </span>
          <span style={{ flex: '3' }}>
            <Skeleton
              animation="wave"
              sx={{ transform: 'none', height: '500px', width: '100%' }}
            />
          </span>
        </Stack>
      ) : (
        <span>
          <Skeleton
            animation="wave"
            sx={{ transform: 'none', height: '500px', width: '100%' }}
          />
        </span>
      )}
    </Stack>
  );

  return isAuth ? renderAuthLoading() : renderNotAuthLoading();
};

export default Loading;
