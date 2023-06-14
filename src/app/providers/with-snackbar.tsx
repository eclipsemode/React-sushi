import React from "react";
import {SnackbarProvider} from "notistack";

const withSnackbar = (component: () => React.ReactNode) => () => {
    return (
        <SnackbarProvider maxSnack={3}>
            {component()}
        </SnackbarProvider>
    )
}


export default withSnackbar;