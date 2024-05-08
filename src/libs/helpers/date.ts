export function dateIsToday(date: Date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatTime(date: Date) {
  return Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
