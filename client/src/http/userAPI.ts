import { $host } from "./index";

type RegistrationType = (
  email: string,
  password: string,
  name: string,
  surname: string,
  tel: string,
  street: string,
  house: string,
  floor: string,
  entrance: string,
  room: string
) => void;


type LoginType = (email: string, password: string) => void;

const registration: RegistrationType = async (email, password, name, surname, tel, street, house, floor, entrance, room) => {
  return await $host.post("api/user/registration", {
    email,
    password,
    name,
    surname,
    tel,
    street,
    house,
    floor,
    entrance,
    room
  });
};

const login: LoginType = async (email, password) => {
  return await $host.post("api/user/login", { email, password });
};

const auth = async () => {
  return await $host.post("api/user/auth");
};

export { registration, login, auth };
