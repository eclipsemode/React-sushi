"use client";

import {persistor, store} from "@store/index";
import React from "react";
import WithAdaptive from "@providers/with-adaptive";
import {PersistGate} from "redux-persist/integration/react";
import WithAuth from "@providers/with-auth";
import {SnackbarProvider} from "notistack";
import MaterialDialog from "@store/features/materialDialog/ui";
import {PulseLoader} from "react-spinners";
import {Provider} from "react-redux";

interface IProps {
    children: React.ReactNode
}

function Providers({children}: IProps) {
    const loader = (
        <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <PulseLoader color="#4caf50"/>
        </div>
    )

    return <Provider store={store}>
        <PersistGate loading={loader} persistor={persistor}>
            <SnackbarProvider maxSnack={3}>
                <WithAdaptive/>
                <WithAuth/>
                {children}
                <MaterialDialog/>
            </SnackbarProvider>
        </PersistGate>
    </Provider>;
}

export default Providers;