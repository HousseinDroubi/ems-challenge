function isValidNumber(salary: string) {
  return /^[0-9]+$/.test(salary);
}

export { isValidNumber };
