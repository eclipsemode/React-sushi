import React from 'react';
import {Skeleton} from "@mui/material";

const Lodaing = () => {
    return (
        <div>
            <span><Skeleton animation='wave' sx={{transform: 'none', height: '500px', width: '100%'}}/></span>
        </div>
    );
};

export default Lodaing;