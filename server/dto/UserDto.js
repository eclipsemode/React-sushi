module.exports = class UserDto {
  id;
  role;
  name;
  surname;

  constructor(model) {
    this.id = model.id;
    this.role = model.role;
    this.name = model.name;
    this.surname = model.surname;
  }
}