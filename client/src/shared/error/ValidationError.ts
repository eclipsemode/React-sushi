import { ServerErrorEnum } from "./index";

class ValidationError extends Error {
  constructor(message: string, setError: CallableFunction, public name: string = "ValidationError") {
    super(message);

    this.emailError(message, setError);
    this.telError(message, setError);
  }

  emailError(message: string, callback: CallableFunction) {
    if (message === ServerErrorEnum.EMAIL_EXISTS) {
      callback("email", { type: "custom", message: ServerErrorEnum.EMAIL_EXISTS });
    }
  }

  telError(message: string, callback: CallableFunction) {
    if (message === ServerErrorEnum.TEL_EXISTS) {
      callback("tel", { type: "custom", message: ServerErrorEnum.TEL_EXISTS });
    }
  }
}

export default ValidationError;