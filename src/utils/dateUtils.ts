export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function formatTime(timeString: string): string {
  const date = new Date(timeString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
}

export function isCurrentDay(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}