export const formatDateToDayMonth = (isoDate) => {
  // Convert the ISO string into a Date object
  const date = new Date(isoDate);

  // Get the day of the month
  const day = date.getDate();

  // Get the month name
  const month = date.toLocaleString("default", { month: "long" });

  // Return the formatted string
  return `${day} ${month}`;
};
