import React from "react";
import WithAdaptive from "@providers/with-adaptive";
import WithAuth from "@providers/with-auth";
import MaterialDialog from "@store/features/materialDialog/ui";
import WithCategories from "@providers/with-categories/with-categories";
import WithStore from "@providers/with-store";
import WithPersist from "@providers/with-persist";
import WithSnackbar from "@providers/with-snackbar";
import WithLocation from "@providers/with-location/with-location";

interface IProps {
    children: React.ReactNode
}

function Providers({children}: IProps) {
    return <WithStore>
        <WithPersist>
            <WithSnackbar>
                <WithLocation />
                <WithCategories/>
                <WithAdaptive/>
                <WithAuth/>
                {children}
                <MaterialDialog/>
            </WithSnackbar>
        </WithPersist>

    </WithStore>;
}

export default Providers;