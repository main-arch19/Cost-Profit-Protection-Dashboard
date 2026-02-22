import { directionMap } from '../data/mockData.js'

// ─── Currency Formatter ───────────────────────────────────────────────────────
export function formatCurrency(dollars) {
  return new Intl.NumberFormat('en-US', {
    style:                 'currency',
    currency:              'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars)
}

// ─── Percent Formatter ────────────────────────────────────────────────────────
export function formatPercent(value, decimals = 0) {
  return `${Number(value).toFixed(decimals)}%`
}

// ─── Drain Color ──────────────────────────────────────────────────────────────
// Returns semantic color hex based on percent of revenue and direction.
// 'negative': higher % = worse (callbacks, idle labor, fleet, warranty, dead inventory)
//   < 8%  → green  (healthy)
//   8–15% → amber  (watch)
//   > 15% → red    (drain)
// 'positive': higher % = better (fix rate, booking rate)
//   ≥ 85% → green
//   70–84%→ amber
//   < 70% → red
export function getDrainColor(percent, metricName) {
  const direction = directionMap[metricName] || 'negative'

  if (direction === 'positive') {
    if (percent >= 85) return '#10B981'
    if (percent >= 70) return '#F59E0B'
    return '#EF4444'
  }

  // negative direction (default)
  if (percent >= 15) return '#EF4444'
  if (percent >= 8)  return '#F59E0B'
  return '#10B981'
}

// ─── Severity Color ───────────────────────────────────────────────────────────
export function getSeverityColor(severity) {
  const map = {
    red:   '#EF4444',
    amber: '#F59E0B',
    green: '#10B981',
  }
  return map[severity] || '#6B7280'
}

// ─── Fix Rate Color ───────────────────────────────────────────────────────────
// First-Time Fix Rate is a 'positive' direction metric
export function getFixRateColor(percent) {
  return getDrainColor(percent, 'First-Time Fix Rate')
}

// ─── Compact Number ───────────────────────────────────────────────────────────
export function formatCompact(dollars) {
  if (Math.abs(dollars) >= 1000) {
    return `$${(dollars / 1000).toFixed(1)}K`
  }
  return formatCurrency(dollars)
}
