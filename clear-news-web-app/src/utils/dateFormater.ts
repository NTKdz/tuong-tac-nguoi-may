export function formatDateTime(dateTimeString: string) {
  const oldDate = new Date(dateTimeString);

  // Extract date components
  const day = String(oldDate.getDate()).padStart(2, "0");
  const month = String(oldDate.getMonth() + 1).padStart(2, "0");
  const year = oldDate.getFullYear();

  // Extract time components
  const hours = String(oldDate.getHours()).padStart(2, "0");
  const minutes = String(oldDate.getMinutes()).padStart(2, "0");
  // const seconds = String(oldDate.getSeconds()).padStart(2, "0");

  // Construct formatted string
  const date = `${day}/${month}/${year}`;
  const time = `${hours}:${minutes}`;

  return { date, time };
}
