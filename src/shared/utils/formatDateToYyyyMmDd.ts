export default function formatDateToYyyyMmDd(value: string) {
  return new Date(String(value))
    .toLocaleDateString()
    .split('.')
    .reverse()
    .join('-');
}
