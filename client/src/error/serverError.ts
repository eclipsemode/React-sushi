enum ServerError {
  EMAIL = 'Пользователь с таким email уже существует.',
  PASSWORD_INCORRECT = 'Указан неверный пароль.',
  USER_NOT_FOUND = 'Пользователь с таким email не найден.'
}

export default ServerError;