import { useState } from 'react'
import { FONTS } from '../styles/tokens.js'

// ─── Banner config by type ────────────────────────────────────────────────────
const BANNER_CONFIG = {
  critical: {
    background:  'rgba(239,68,68,0.06)',
    borderColor: '#EF4444',
    textColor:   '#7F1D1D',
    iconColor:   '#EF4444',
    iconBg:      'rgba(239,68,68,0.12)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    btnBg:    '#EF4444',
    btnText:  '#FFFFFF',
    fontWeight: '700',
  },
  warning: {
    background:  'rgba(245,158,11,0.06)',
    borderColor: '#F59E0B',
    textColor:   '#78350F',
    iconColor:   '#F59E0B',
    iconBg:      'rgba(245,158,11,0.12)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    btnBg:    '#F59E0B',
    btnText:  '#FFFFFF',
    fontWeight: '600',
  },
  info: {
    background:  'rgba(59,130,246,0.06)',
    borderColor: '#3B82F6',
    textColor:   '#1E3A8A',
    iconColor:   '#3B82F6',
    iconBg:      'rgba(59,130,246,0.12)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    btnBg:    '#3B82F6',
    btnText:  '#FFFFFF',
    fontWeight: '500',
  },
}

// ─── Single Alert Banner ──────────────────────────────────────────────────────
function AlertBanner({ alert, onDismiss }) {
  const [hoveredBtn, setHoveredBtn] = useState(null)
  const cfg = BANNER_CONFIG[alert.type]

  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      gap:            '12px',
      padding:        '10px 20px',
      backgroundColor: cfg.background,
      borderLeft:     `4px solid ${cfg.borderColor}`,
      borderBottom:   '1px solid rgba(0,0,0,0.04)',
    }}>
      {/* Icon */}
      <div style={{
        width:           '28px',
        height:          '28px',
        borderRadius:    '6px',
        backgroundColor: cfg.iconBg,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
      }}>
        {cfg.icon}
      </div>

      {/* Message */}
      <span style={{
        flex:       1,
        fontFamily: FONTS.ui,
        fontSize:   '13px',
        fontWeight: cfg.fontWeight,
        color:      cfg.textColor,
        lineHeight: '1.4',
      }}>
        {alert.message}
      </span>

      {/* Action button */}
      {alert.action && (
        <button
          style={{
            fontFamily:      FONTS.ui,
            fontSize:        '12px',
            fontWeight:      '700',
            padding:         '5px 12px',
            borderRadius:    '4px',
            border:          'none',
            cursor:          'pointer',
            backgroundColor: hoveredBtn === 'action'
              ? cfg.borderColor
              : cfg.btnBg,
            color:           cfg.btnText,
            whiteSpace:      'nowrap',
            transition:      'opacity 0.12s',
            opacity:         hoveredBtn === 'action' ? 0.9 : 1,
            flexShrink:      0,
          }}
          onMouseEnter={() => setHoveredBtn('action')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => {}}
        >
          {alert.action}
        </button>
      )}

      {/* Dismiss × */}
      <button
        aria-label="Dismiss alert"
        onClick={() => onDismiss(alert.id)}
        style={{
          background:  'none',
          border:      'none',
          cursor:      'pointer',
          color:       cfg.iconColor,
          fontSize:    '18px',
          lineHeight:  '1',
          padding:     '2px 4px',
          borderRadius:'4px',
          opacity:     hoveredBtn === 'dismiss' ? 1 : 0.6,
          transition:  'opacity 0.12s',
          flexShrink:  0,
          fontFamily:  'system-ui',
        }}
        onMouseEnter={() => setHoveredBtn('dismiss')}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        ×
      </button>
    </div>
  )
}

// ─── Alert Banner Zone ────────────────────────────────────────────────────────
export default function AlertBannerZone({ alerts, onDismiss }) {
  if (alerts.length === 0) {
    return (
      <div style={{
        height:          '48px',
        backgroundColor: '#FAFAFA',
        borderBottom:    '1px solid #F0FDF4',
        display:         'flex',
        alignItems:      'center',
        padding:         '0 24px',
      }}>
        <span style={{
          fontFamily: FONTS.ui,
          fontSize:   '12px',
          color:      '#10B981',
          fontWeight: '600',
          display:    'flex',
          alignItems: 'center',
          gap:        '6px',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          All alerts reviewed — no active critical notifications
        </span>
      </div>
    )
  }

  return (
    <div style={{ borderBottom: '1px solid #F0FDF4' }}>
      {alerts.map(alert => (
        <AlertBanner key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
