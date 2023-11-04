function formatDateToString(date: Date) {
  return date.toLocaleDateString().split('.').join('-');
}

export default formatDateToString;
