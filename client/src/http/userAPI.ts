import { $host } from "./index";

const registration = async (email: string, password: string, name: string, surname: string, tel: string, street: string, house: string, floor: string, entrance: string, room: string) => {
  const response = await $host.post('api/user/registration', {email, password, name, surname, tel, street, house, floor, entrance, room});
  return response;
}

const login = async (email: string, password: string) => {
  const response = await $host.post('api/user/login', {email, password});
  return response;
}

const auth = async () => {
  const response = await $host.post('api/user/auth');
  return response;
}

export {registration, login, auth};
