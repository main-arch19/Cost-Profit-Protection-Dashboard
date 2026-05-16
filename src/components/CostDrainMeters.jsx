import { useState } from 'react'
import { drainMeters } from '../data/mockData.js'
import { CARD_BASE, FONTS, COLORS } from '../styles/tokens.js'
import { getDrainColor, formatCurrency, formatPercent } from '../utils/formatters.js'

// ─── Threshold tick markers on bar ───────────────────────────────────────────
function ThresholdTick({ pct, label }) {
  return (
    <div style={{
      position: 'absolute',
      left:     `${pct}%`,
      top:      0,
      bottom:   0,
      width:    '1px',
      backgroundColor: 'rgba(0,0,0,0.15)',
    }}>
      <div style={{
        position:   'absolute',
        top:        '-16px',
        left:       '-10px',
        fontSize:   '9px',
        fontFamily: FONTS.mono,
        color:      '#9CA3AF',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  )
}

// ─── Single Drain Meter Widget ────────────────────────────────────────────────
function DrainMeter({ meter }) {
  const [hovered, setHovered] = useState(false)
  const color = getDrainColor(meter.percent, meter.metric)

  // Color label for threshold zones
  const zoneLabel =
    meter.percent >= 15 ? 'DRAIN' :
    meter.percent >= 8  ? 'WATCH' :
    'SAFE'

  const zoneLabelColor =
    meter.percent >= 15 ? '#EF4444' :
    meter.percent >= 8  ? '#F59E0B' :
    '#10B981'

  const trendColor = meter.trendUp ? '#EF4444' : '#10B981'
  const trendArrow = meter.trendUp ? '↑' : '↓'

  return (
    <div
      style={{
        ...CARD_BASE,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        transform:  hovered ? 'translateY(-1px)' : 'none',
        boxShadow:  hovered
          ? '0 4px 12px rgba(0,0,0,0.08)'
          : CARD_BASE.boxShadow,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header row: label + zone badge */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        marginBottom:   '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: FONTS.ui,
            fontSize:   '14px',
            fontWeight: '600',
            color:      '#111827',
          }}>
            {meter.label}
          </span>
          {/* Trend indicator */}
          <span style={{
            fontFamily: FONTS.mono,
            fontSize:   '11px',
            fontWeight: '500',
            color:      trendColor,
          }}>
            {trendArrow} {meter.trend}
          </span>
        </div>

        {/* Zone badge */}
        <span style={{
          fontFamily:      FONTS.mono,
          fontSize:        '10px',
          fontWeight:      '700',
          letterSpacing:   '0.08em',
          color:           zoneLabelColor,
          backgroundColor: `${zoneLabelColor}14`,
          borderRadius:    '4px',
          padding:         '2px 7px',
          border:          `1px solid ${zoneLabelColor}30`,
        }}>
          {zoneLabel}
        </span>
      </div>

      {/* Percent value — IBM Plex Mono */}
      <div style={{
        fontFamily:    FONTS.mono,
        fontSize:      '24px',
        fontWeight:    '600',
        color:         color,
        letterSpacing: '-0.02em',
        lineHeight:    '1',
        marginBottom:  '12px',
      }}>
        {formatPercent(meter.percent, 1)}
        <span style={{
          fontFamily: FONTS.ui,
          fontSize:   '12px',
          fontWeight: '400',
          color:      '#9CA3AF',
          marginLeft: '6px',
          letterSpacing: '0',
        }}>
          of revenue
        </span>
      </div>

      {/* Bar track */}
      <div style={{ position: 'relative', marginBottom: '4px', paddingTop: '20px' }}>
        <div style={{
          position:        'relative',
          height:          '10px',
          backgroundColor: '#F3F4F6',
          borderRadius:    '999px',
          overflow:        'hidden',
        }}>
          {/* Filled bar */}
          <div style={{
            position:        'absolute',
            top:             0,
            left:            0,
            height:          '100%',
            width:           `${Math.min(meter.percent, 100)}%`,
            backgroundColor: color,
            borderRadius:    '999px',
            transition:      'width 0.5s ease, background-color 0.3s ease',
          }} />
        </div>

        {/* Threshold tick marks rendered above the bar track */}
        <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, height: '10px', pointerEvents: 'none' }}>
          <ThresholdTick pct={8}  label="8%" />
          <ThresholdTick pct={15} label="15%" />
        </div>
      </div>

      {/* Detail row */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginTop:      '10px',
      }}>
        <span style={{
          fontFamily: FONTS.ui,
          fontSize:   '12px',
          color:      '#6B7280',
        }}>
          {meter.detail}
        </span>
        <span style={{
          fontFamily: FONTS.mono,
          fontSize:   '12px',
          fontWeight: '600',
          color:      color,
        }}>
          {formatCurrency(meter.monthlyCost)}<span style={{ fontWeight: '400', color: '#9CA3AF' }}>/mo</span>
        </span>
      </div>
    </div>
  )
}

// ─── Cost Drain Meters Section ────────────────────────────────────────────────
export default function CostDrainMeters({ isMobile }) {
  const totalMonthlyCost = drainMeters.reduce((sum, m) => sum + m.monthlyCost, 0)

  return (
    <section>
      {/* Section header */}
      <div style={{
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'space-between',
        marginBottom:   '16px',
        flexWrap:       'wrap',
        gap:            '8px',
      }}>
        <div>
          <h2 style={{
            fontFamily:    FONTS.ui,
            fontSize:      '13px',
            fontWeight:    '700',
            color:         '#6B7280',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            margin:        '0 0 4px 0',
          }}>
            Cost Drain Meters
          </h2>
          <p style={{
            fontFamily: FONTS.ui,
            fontSize:   '13px',
            color:      '#9CA3AF',
            margin:     0,
          }}>
            % of monthly revenue — green &lt;8% · amber 8–15% · red &gt;15%
          </p>
        </div>

        {/* Total drain chip — wraps below heading on narrow screens */}
        <div style={{
          fontFamily:      FONTS.mono,
          fontSize:        '13px',
          fontWeight:      '600',
          color:           '#EF4444',
          backgroundColor: '#FEF2F2',
          border:          '1px solid #FECACA',
          borderRadius:    '6px',
          padding:         '5px 12px',
          display:         'flex',
          alignItems:      'center',
          gap:             '6px',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          {formatCurrency(totalMonthlyCost)}/mo total drain
        </div>
      </div>

      {/* Meter cards — 3 + 2 on desktop, single column on mobile */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap:                 '16px',
        marginBottom:        '16px',
      }}>
        {drainMeters.slice(0, 3).map(meter => (
          <DrainMeter key={meter.id} meter={meter} />
        ))}
      </div>

      <div style={{
        display:             'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap:                 '16px',
      }}>
        {drainMeters.slice(3).map(meter => (
          <DrainMeter key={meter.id} meter={meter} />
        ))}
      </div>
    </section>
  )
}
