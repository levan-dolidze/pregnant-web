
export function extractTimes(bookedTimes: string[]): string[] {
  return bookedTimes
    .map(timestamp => timestamp.substring(11, 16))
    .filter((time, index, array) => array.indexOf(time) === index)
}



export const Today = Date.UTC(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
)


export const getAge = (dateString: string | Date): number => {
  if (!dateString) return 0;

  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
};

export const isAdult = (dateString: string | Date, minAge = 18): boolean => {
  return getAge(dateString) >= minAge;
};