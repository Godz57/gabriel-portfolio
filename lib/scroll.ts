/** 0–1 scroll progress for the document. */
export function computeScrollProgress(
  scrollY: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const max = scrollHeight - clientHeight
  if (max <= 0) return 0
  const ratio = scrollY / max
  if (ratio < 0) return 0
  if (ratio > 1) return 1
  return ratio
}
