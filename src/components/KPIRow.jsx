import { useState } from 'react'
import { kpiData } from '../data/mockData.js'
import { FONTS, KPI_CARD_GREEN, KPI_CARD_RED, KPI_CARD_AMBER, KPI_CARD_NEUTRAL } from '../styles/tokens.js'

// ─── Theme → card style map ───────────────────────────────────────────────────
const CARD_STYLE_MAP = {
  green:   KPI_CARD_GREEN,
  red:     KPI_CARD_RED,
  amber:   KPI_CARD_AMBER,
  neutral: KPI_CARD_NEUTRAL,
}

const THEME_COLOR = {
  green:   '#10B981',
  red:     '#EF4444',
  amber:   '#F59E0B',
  neutral: '#6B7280',
}

// ─── Delta Badge ──────────────────────────────────────────────────────────────
function DeltaBadge({ delta, positive }) {
  const color = positive ? '#10B981' : '#EF4444'
  const bg    = positive ? '#ECFDF5' : '#FEF2F2'
  const arrow = positive ? '↑' : '↓'

  return (
    <div style={{
      display:         'inline-flex',
      alignItems:      'center',
      gap:             '3px',
      backgroundColor: bg,
      color:           color,
      borderRadius:    '4px',
      padding:         '2px 7px',
      fontSize:        '11px',
      fontWeight:      '600',
      fontFamily:      FONTS.mono,
      marginBottom:    '8px',
    }}>
      <span style={{ fontSize: '10px' }}>{arrow}</span>
      {delta}
    </div>
  )
}

// ─── Single KPI Card ──────────────────────────────────────────────────────────
function KPICard({ data, isPulsing }) {
  const [hovered, setHovered] = useState(false)
  const cardStyle = CARD_STYLE_MAP[data.theme]
  const themeColor = THEME_COLOR[data.theme]

  return (
    <div
      className={isPulsing ? 'pulse-card' : ''}
      style={{
        ...cardStyle,
        transition:      'transform 0.15s ease, box-shadow 0.15s ease',
        transform:       hovered ? 'translateY(-1px)' : 'none',
        boxShadow:       hovered && !isPulsing
          ? '0 4px 12px rgba(0,0,0,0.08)'
          : cardStyle.boxShadow,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label */}
      <div style={{
        fontFamily:    FONTS.ui,
        fontSize:      '11px',
        fontWeight:    '600',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color:         '#6B7280',
        marginBottom:  '10px',
        display:       'flex',
        alignItems:    'center',
        gap:           '6px',
      }}>
        {/* Semantic color dot */}
        <span style={{
          width:           '6px',
          height:          '6px',
          borderRadius:    '50%',
          backgroundColor: themeColor,
          flexShrink:      0,
          display:         'inline-block',
        }} />
        {data.label}
      </div>

      {/* Value — IBM Plex Mono, non-negotiable */}
      <div style={{
        fontFamily:    FONTS.mono,
        fontSize:      '30px',
        fontWeight:    '600',
        color:         '#111827',
        letterSpacing: '-0.02em',
        lineHeight:    '1.1',
        marginBottom:  '10px',
      }}>
        {data.formatted}
      </div>

      {/* Delta */}
      <DeltaBadge delta={data.delta} positive={data.deltaPositive} />

      {/* Description */}
      <div style={{
        fontFamily: FONTS.ui,
        fontSize:   '12px',
        color:      '#6B7280',
        lineHeight: '1.4',
        marginTop:  '2px',
      }}>
        {data.subtext}
      </div>
    </div>
  )
}

// ─── KPI Row ──────────────────────────────────────────────────────────────────
export default function KPIRow() {
  // Pulse is a derived boolean — not state
  const isPulsing = kpiData.activeDrain.value > kpiData.activeDrain.threshold

  return (
    <section>
      {/* Section header */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontFamily:  FONTS.ui,
          fontSize:    '13px',
          fontWeight:  '700',
          color:       '#6B7280',
          letterSpacing:'0.06em',
          textTransform:'uppercase',
          margin:      0,
        }}>
          Key Metrics — February 2026
        </h2>
      </div>

      {/* 4-column KPI grid */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap:                 '16px',
      }}>
        <KPICard data={kpiData.identifiedSavings} isPulsing={false} />
        <KPICard data={kpiData.activeDrain}        isPulsing={isPulsing} />
        <KPICard data={kpiData.monitorItems}       isPulsing={false} />
        <KPICard data={kpiData.fixRate}            isPulsing={false} />
      </div>
    </section>
  )
}
