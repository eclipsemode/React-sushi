class ValidationError extends Error {
  constructor(public message: string, public name: string = 'ValidationError') {
    super(message);
  }
}

export default ValidationError;