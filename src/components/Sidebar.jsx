import { useState } from 'react'
import { navItems } from '../data/mockData.js'
import { FONTS, COLORS, SIDEBAR_NAV_ITEM_BASE, SIDEBAR_NAV_ITEM_ACTIVE } from '../styles/tokens.js'

// ─── Shield SVG with downward cost-trend line ─────────────────────────────────
function ShieldLogo() {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 2L4 8v11c0 10.5 6.1 19.3 14 22 7.9-2.7 14-11.5 14-22V8L18 2z"
        fill="#10B981"
        fillOpacity="0.12"
      />
      <path
        d="M18 2L4 8v11c0 10.5 6.1 19.3 14 22 7.9-2.7 14-11.5 14-22V8L18 2z"
        stroke="#10B981"
        strokeWidth="2"
        fill="none"
      />
      <polyline
        points="9,14 13,18 17,15 22,21 27,17"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="24,17 27,17 27,20"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Nav Icon (path-based SVG) ────────────────────────────────────────────────
function NavIcon({ path, active }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? COLORS.activeNavText : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d={path} />
    </svg>
  )
}

// ─── Count Badge ──────────────────────────────────────────────────────────────
function CountBadge({ count, color }) {
  return (
    <span style={{
      marginLeft:      'auto',
      minWidth:        '20px',
      height:          '20px',
      borderRadius:    '10px',
      backgroundColor: color,
      color:           '#FFFFFF',
      fontSize:        '11px',
      fontWeight:      '700',
      fontFamily:      FONTS.mono,
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      padding:         '0 5px',
      lineHeight:      '1',
      flexShrink:      0,
    }}>
      {count}
    </span>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export default function Sidebar({ activeNav, onNavChange, isOpen, isMobile, onToggle, onClose }) {
  const [hoveredItem, setHoveredItem]   = useState(null)
  const [hoverToggle, setHoverToggle]   = useState(false)

  return (
    <div style={{
      position:        'fixed',
      top:             0,
      left:            0,
      width:           '240px',
      height:          '100vh',
      backgroundColor: '#FAFAFA',
      borderRight:     '1px solid #F0FDF4',
      display:         'flex',
      flexDirection:   'column',
      overflowY:       'auto',
      zIndex:          100,
      transform:       isOpen ? 'translateX(0)' : 'translateX(-240px)',
      transition:      'transform 0.25s ease',
      boxShadow:       isMobile && isOpen ? '4px 0 20px rgba(0,0,0,0.12)' : 'none',
    }}>
      {/* Logo / Brand */}
      <div style={{
        padding:      '20px 16px 16px',
        borderBottom: '1px solid #F0FDF4',
        flexShrink:   0,
      }}>
        <div style={{
          display:     'flex',
          alignItems:  'center',
          gap:         '10px',
          marginBottom:'12px',
        }}>
          <ShieldLogo />
          <div>
            <div style={{
              fontFamily:    FONTS.ui,
              fontSize:      '13px',
              fontWeight:    '700',
              color:         '#065F46',
              letterSpacing: '0.02em',
              lineHeight:    '1.2',
            }}>
              COST & PROFIT
            </div>
            <div style={{
              fontFamily:    FONTS.mono,
              fontSize:      '9px',
              fontWeight:    '400',
              color:         '#6B7280',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              PROTECTION
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '6px',
          padding:         '6px 10px',
          backgroundColor: 'rgba(239,68,68,0.06)',
          borderRadius:    '6px',
          border:          '1px solid rgba(239,68,68,0.15)',
        }}>
          <span style={{
            width:           '7px',
            height:          '7px',
            borderRadius:    '50%',
            backgroundColor: '#EF4444',
            flexShrink:      0,
            boxShadow:       '0 0 0 2px rgba(239,68,68,0.2)',
          }} />
          <span style={{
            fontFamily: FONTS.ui,
            fontSize:   '11px',
            fontWeight: '600',
            color:      '#991B1B',
          }}>
            5 Active Drains
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '16px 10px', flex: 1 }}>
        <div style={{
          fontFamily:    FONTS.ui,
          fontSize:      '10px',
          fontWeight:    '600',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         '#6B7280',
          padding:       '0 6px',
          marginBottom:  '8px',
        }}>
          Audit Areas
        </div>

        {navItems.map(item => {
          const isActive  = activeNav === item.id
          const isHovered = hoveredItem === item.id && !isActive
          const itemStyle = isActive
            ? SIDEBAR_NAV_ITEM_ACTIVE
            : {
                ...SIDEBAR_NAV_ITEM_BASE,
                backgroundColor: isHovered ? 'rgba(16,185,129,0.04)' : 'transparent',
              }

          return (
            <div
              key={item.id}
              style={itemStyle}
              onClick={() => { onNavChange(item.id); if (isMobile) onClose() }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') { onNavChange(item.id); if (isMobile) onClose() } }}
            >
              <NavIcon path={item.iconPath} active={isActive} />
              <span style={{ flex: 1 }}>{item.label}</span>
              <CountBadge count={item.badgeCount} color={item.badgeColor} />
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding:        '12px 16px',
        borderTop:      '1px solid #F0FDF4',
        flexShrink:     0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: FONTS.ui,
          fontSize:   '11px',
          color:      '#9CA3AF',
          lineHeight: '1.5',
        }}>
          <div style={{ fontWeight: '600', color: '#6B7280', marginBottom: '2px' }}>
            February 2026
          </div>
          Audit Period Active
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={onToggle}
          aria-label="Collapse sidebar"
          onMouseEnter={() => setHoverToggle(true)}
          onMouseLeave={() => setHoverToggle(false)}
          style={{
            background:    hoverToggle ? '#059669' : '#10B981',
            border:        'none',
            borderRadius:  '6px',
            cursor:        'pointer',
            padding:       '0',
            width:         '30px',
            height:        '30px',
            display:       'flex',
            alignItems:    'center',
            justifyContent:'center',
            flexShrink:    0,
            boxShadow:     hoverToggle ? '0 0 0 3px rgba(16,185,129,0.25)' : '0 0 0 2px rgba(16,185,129,0.15)',
            transition:    'all 0.15s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="5" height="14" rx="1.5"
              fill="rgba(255,255,255,0.9)" />
            <rect x="7.5" y="1" width="7.5" height="14" rx="1.5"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.2" />
            <polyline
              points="11,5.5 9,8 11,10.5"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
