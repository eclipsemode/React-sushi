import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchUserInfo, IRegistrationProps } from "../../../redux/features/userSlice";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState<IRegistrationProps | null>(null);

  React.useEffect(() => {
    (async function getUsers() {
      const { payload } = await dispatch(fetchUserInfo());
      console.log(payload)
    })()
  }, [user, setUser, dispatch])

  return (
    <section>
  Hello
    </section>
  );
};

export default Profile;