'use client'
import React from 'react';
import {Skeleton, Stack} from "@mui/material";
import {useAppSelector} from "@store/hooks";
import {DeviceType, selectAdaptiveServiceSlice} from "@store/features/adaptive";

const Loading = () => {
    const {deviceType} = useAppSelector(selectAdaptiveServiceSlice);
    return (
        <Stack rowGap='1rem'>
            <span><Skeleton animation='wave' sx={{transform: 'none', height: '24px', width: '100%'}}/></span>

            {
                deviceType === DeviceType.DESKTOP
                ? (
                        <Stack direction='row' columnGap='1rem'>
                            <span style={{flex: '1'}}><Skeleton animation='wave' sx={{transform: 'none', height: '500px', maxWidth: '300px', width: '100%'}}/></span>
                            <span style={{flex: '3'}}><Skeleton animation='wave' sx={{transform: 'none', height: '500px', width: '100%'}}/></span>
                        </Stack>
                    )
                : (
                        <span><Skeleton animation='wave' sx={{transform: 'none', height: '500px', width: '100%'}}/></span>
                    )
            }


        </Stack>
    );
};

export default Loading;