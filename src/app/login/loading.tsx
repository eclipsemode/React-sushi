'use client'
import React from 'react';
import {Skeleton} from "@mui/material";

const Loading = () => {
    return <span><Skeleton animation='wave' style={{maxWidth: '450px', width: '100%', height: '250px', transform: 'none', margin: '0 auto'}} /></span>
};

export default Loading;