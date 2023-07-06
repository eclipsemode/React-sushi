"use client"
import React from 'react';
import {persistor} from "@store/index";
import {PersistGate} from "redux-persist/integration/react";
import {PulseLoader} from "react-spinners";

interface IProps {
    children: React.ReactNode
}

const WithPersist = ({children}: IProps) => {
    const loader = (
        <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <PulseLoader color="#4caf50"/>
        </div>
    )
    return (
        <PersistGate loading={loader} persistor={persistor}>
            {children}
        </PersistGate>
    );
};

export default WithPersist;