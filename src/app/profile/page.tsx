'use client'
import React from "react";
import {useAppSelector} from "@store/hooks";
import {selectUser} from "@store/features/user";
import Account from "@store/features/account/ui/Account";
import Auth from "@store/features/auth/ui";

const AccountPage: React.FC = () => {
    const {isAuth} = useAppSelector(selectUser);
    return isAuth ? <Account /> : <Auth />
};

export default AccountPage;