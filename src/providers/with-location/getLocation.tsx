import WithLocation from '@providers/with-location/index';
import {IBranch} from '@store/features/branch/api';
import React from 'react';
import {getCookie} from "cookies-next/server";
import {cookies} from 'next/headers';

async function getBranches(): Promise<IBranch[]> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/branch`, {
        cache: 'no-store',
    });
    return response.json();
}

interface IProps {
    children: React.ReactNode;
}

const GetLocation = async ({children}: IProps) => {
    const branchId = await getCookie('branch-initial', {cookies});
    const branches = await getBranches();

    return (
        <WithLocation branches={branches} cookieBranchId={branchId}>
            {children}
        </WithLocation>
    );
};

export default GetLocation;
