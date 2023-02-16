function calcTime(minutes: number) {
  let current: Date = new Date();
  let timeArr: string[] = [];
  do {
    current = new Date(current.getTime() + minutes * 60000);
    timeArr.push(current.toLocaleTimeString().slice(0, 5));
  } while (Number(current.toLocaleTimeString().slice(0, 2)) < 23);

  return timeArr;
}

export { calcTime };