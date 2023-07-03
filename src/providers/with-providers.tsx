"use client";

import {persistor, store} from "@store/index";
import {Provider} from "react-redux";
import React from "react";
import WithAdaptive from "@providers/with-adaptive";
import {PersistGate} from "redux-persist/integration/react";
import WithAuth from "@providers/with-auth";
import {SnackbarProvider} from "notistack";
import MaterialDialog from "@store/features/materialDialog/ui";

interface IProps {
    children: React.ReactNode
}

export const Providers = ({children}: IProps) => {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider maxSnack={3}>
                <WithAdaptive/>
                <WithAuth/>
                {children}
                <MaterialDialog />
            </SnackbarProvider>
        </PersistGate>
    </Provider>;
}