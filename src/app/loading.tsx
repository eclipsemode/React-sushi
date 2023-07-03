import React from 'react';
import {PulseLoader} from "react-spinners";

const Loading = () => {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: '80px' }}>
            <PulseLoader color="#4caf50" />
        </div>
    );
};

export default Loading;