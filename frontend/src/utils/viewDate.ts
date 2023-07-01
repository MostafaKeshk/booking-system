export const viewDate = (date: Date) =>
  `${new Date(date).toLocaleString("en-GB", {
    hour12: true,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
  })}`;
