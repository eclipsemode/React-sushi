import { ServerErrorEnum } from './index';

class ValidationError extends Error {
  constructor(
    message: string,
    setError: CallableFunction,
    public name: string = 'ValidationError'
  ) {
    super(message);

    this.emailError(message, setError);
    this.telError(message, setError);
    this.loginError(message, setError);
  }

  emailError(message: string, callback: CallableFunction): void {
    if (message === ServerErrorEnum.EMAIL_EXISTS) {
      callback('email', {
        type: 'custom',
        message: ServerErrorEnum.EMAIL_EXISTS,
      });
    }
  }

  telError(message: string, callback: CallableFunction): void {
    if (message === ServerErrorEnum.TEL_EXISTS) {
      callback('tel', { type: 'custom', message: ServerErrorEnum.TEL_EXISTS });
    }
  }

  loginError(message: string, callback: CallableFunction): void {
    if (
      message === ServerErrorEnum.EMAIL_NOT_FOUND ||
      message === ServerErrorEnum.PASSWORD_INCORRECT
    ) {
      callback('login', {
        type: 'custom',
        message: 'Неправильный логин или пароль.',
      });
    }
    if (message === ServerErrorEnum.ACC_NOT_ACTIVATED) {
      callback('login', {
        type: 'custom',
        message: ServerErrorEnum.ACC_NOT_ACTIVATED,
      });
    }
  }
}

export default ValidationError;
