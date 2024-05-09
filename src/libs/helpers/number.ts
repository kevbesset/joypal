export function formatNumber(count: number) {
  return Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(count);
}
