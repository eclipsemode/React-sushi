module.exports = class UserDto {
  email;
  id;
  isActivated;
  role;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.role = model.role;
  }
}