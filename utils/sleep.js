function sleep(milliSeconds) {
  let start = new Date().getTime();
  while (new Date().getTime() < start + milliSeconds) {}
}
