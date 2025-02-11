function isValidDate(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function is18OrOlder(dateString: string) {
  const today = new Date();
  const date = new Date(dateString);

  let age = today.getFullYear() - date.getFullYear();

  const monthDifference = today.getMonth() - date.getMonth();
  const dayDifference = today.getDate() - date.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--; // Decrease the age if birthday hasn't happened yet this year
  }

  return age >= 18;
}

export { isValidDate, is18OrOlder };
