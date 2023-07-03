"use client"
import React from "react";
import Login from "@store/features/login/ui";
import Registration from "@store/features/registration/ui";
import {useRouter} from "next/navigation";
import MenuPath from "@shared/utils/menuPath";

const Index: React.FC = () => {
    const router = useRouter();
    const [auth, setAuth] = React.useState<boolean>(true);

    React.useEffect(() => {
        auth ? router.push(MenuPath.LOGIN) : router.push(MenuPath.REGISTRATION)
    }, [auth, router])

    return (
        auth ? <Login setAuth={setAuth} /> : <Registration setAuth={setAuth}/>
    );
};

export default Index;