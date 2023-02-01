import React from "react";
import { useAppDispatch } from "app/hooks";
import { fetchAuth } from "processes/auth";

const withAuth = (component: any) => () => {

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(fetchAuth())
    }
  }, [dispatch])

  return component();
}

export default withAuth;