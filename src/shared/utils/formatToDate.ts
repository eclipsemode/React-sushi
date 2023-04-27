function formatToDate(date: string) {
  const dateArr: string[] = date.split('-');
  [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];
  return new Date(dateArr.join('-'));
}

export default formatToDate;