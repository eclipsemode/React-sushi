enum ServerErrorEnum {
  EMAIL_EXISTS = 'Пользователь с таким email уже существует.',
  TEL_EXISTS = 'Пользователь с таким номером телефона уже существует.',
  EMAIL_NOT_FOUND = 'Пользователь с таким email не найден.',
  PASSWORD_INCORRECT = 'Указан неверный пароль.',
  ACC_NOT_ACTIVATED = 'Аккаунт не активирован, проверьте почту.',
}

export default ServerErrorEnum;
