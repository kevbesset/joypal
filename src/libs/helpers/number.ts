export function formatNumber(count: number) {
  return Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(count);
}

export function formatSize(size: number) {
  return formatNumber(size / 1000000000);
}
