export const setDateTimeToString = (): string => (new Date().toLocaleString("ru", {
  day: "numeric",
  month: 'numeric',
  year: 'numeric',
  hour: "numeric",
  minute: "numeric",
}));

export default setDateTimeToString;
