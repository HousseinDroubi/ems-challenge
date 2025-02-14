function isValidDate(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

const getAgeFromBirthDate = (birth_date: string): number => {
  const today = new Date();
  const date = new Date(birth_date);

  let age = today.getFullYear() - date.getFullYear();

  const monthDifference = today.getMonth() - date.getMonth();
  const dayDifference = today.getDate() - date.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  return age;
};

function is18OrOlder(dateString: string) {
  return getAgeFromBirthDate(dateString) >= 18;
}

function isEndDateGreaterThanStartDate(
  start_date_string: string,
  end_date_string: string
) {
  const start_date = new Date(start_date_string);
  const end_date = new Date(end_date_string);

  return end_date > start_date;
}

const isNowBetweenStartTimeAndLastTime = (start_time: any, end_time: any) => {
  const date = new Date();
  return (
    isEndDateGreaterThanStartDate(start_time, date.toISOString()) &&
    isEndDateGreaterThanStartDate(date.toISOString(), end_time)
  );
};

const getFormattedToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();
  month = month < 10 ? `0${month}` : String(month);
  day = day < 10 ? `0${day}` : String(day);
  const formattedDate: string = `${year}-${month}-${day}`;
  return formattedDate;
};

export {
  isValidDate,
  is18OrOlder,
  isEndDateGreaterThanStartDate,
  getAgeFromBirthDate,
  getFormattedToday,
  isNowBetweenStartTimeAndLastTime,
};
