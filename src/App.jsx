import { useState } from 'react'
import { alerts } from './data/mockData.js'
import { FONTS } from './styles/tokens.js'
import { useWindowWidth } from './hooks/useWindowWidth.js'
import Sidebar from './components/Sidebar.jsx'
import AlertBannerZone from './components/AlertBannerZone.jsx'
import KPIRow from './components/KPIRow.jsx'
import CostDrainMeters from './components/CostDrainMeters.jsx'
import TechnicianTable from './components/TechnicianTable.jsx'

// ─── Page Header ──────────────────────────────────────────────────────────────
function PageHeader({ isMobile }) {
  return (
    <div style={{
      display:        'flex',
      alignItems:     'flex-start',
      justifyContent: 'space-between',
      marginBottom:   '28px',
      flexWrap:       'wrap',
      gap:            '12px',
    }}>
      <div>
        <h1 style={{
          fontFamily:    FONTS.ui,
          fontSize:      isMobile ? '18px' : '22px',
          fontWeight:    '700',
          color:         '#111827',
          margin:        '0 0 4px 0',
          letterSpacing: '-0.02em',
        }}>
          Cost &amp; Profit Protection Dashboard
        </h1>
        <p style={{
          fontFamily: FONTS.ui,
          fontSize:   '14px',
          color:      '#6B7280',
          margin:     0,
        }}>
          February 2026 — Drain Analysis &amp; Recovery Tracking
        </p>
      </div>

      {/* Last updated chip */}
      <div style={{
        fontFamily:      FONTS.mono,
        fontSize:        '11px',
        color:           '#6B7280',
        backgroundColor: '#F9FAFB',
        border:          '1px solid #E5E7EB',
        borderRadius:    '6px',
        padding:         '6px 12px',
        display:         'flex',
        alignItems:      'center',
        gap:             '6px',
        flexShrink:      0,
      }}>
        <span style={{
          width:           '7px',
          height:          '7px',
          borderRadius:    '50%',
          backgroundColor: '#10B981',
          display:         'inline-block',
          boxShadow:       '0 0 0 2px rgba(16,185,129,0.2)',
        }} />
        Live · Updated just now
      </div>
    </div>
  )
}

// ─── Section Divider ──────────────────────────────────────────────────────────
function SectionDivider({ label }) {
  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      gap:        '12px',
      margin:     '36px 0 0',
    }}>
      <div style={{
        height:          '1px',
        width:           '24px',
        backgroundColor: '#D1FAE5',
        flexShrink:      0,
      }} />
      <span style={{
        fontFamily:    FONTS.ui,
        fontSize:      '10px',
        fontWeight:    '600',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         '#9CA3AF',
        whiteSpace:    'nowrap',
      }}>
        {label}
      </span>
      <div style={{
        height:          '1px',
        flex:            1,
        backgroundColor: '#F3F4F6',
      }} />
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav]             = useState('cost-drains')
  const [dismissedAlerts, setDismissedAlerts] = useState([])
  const [sidebarOpen, setSidebarOpen]         = useState(() => window.innerWidth > 768)
  const [hoverReopen, setHoverReopen]         = useState(false)

  const { isMobile } = useWindowWidth()

  const visibleAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id))

  function handleDismiss(id) {
    setDismissedAlerts(prev => [...prev, id])
  }

  return (
    <div style={{
      display:         'flex',
      height:          '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily:      FONTS.ui,
    }}>
      {/* ── Fixed sidebar ──────────────────────────────────────────────── */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onToggle={() => setSidebarOpen(p => !p)}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Mobile backdrop ────────────────────────────────────────────── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          style={{
            position:        'fixed',
            inset:           0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            zIndex:          99,
            cursor:          'pointer',
          }}
        />
      )}

      {/* ── Desktop floating re-open button ────────────────────────────── */}
      {!isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          onMouseEnter={() => setHoverReopen(true)}
          onMouseLeave={() => setHoverReopen(false)}
          style={{
            position:        'fixed',
            top:             '16px',
            left:            '12px',
            zIndex:          200,
            width:           '30px',
            height:          '30px',
            borderRadius:    '6px',
            backgroundColor: hoverReopen ? '#059669' : '#10B981',
            border:          'none',
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            boxShadow:       hoverReopen ? '0 0 0 3px rgba(16,185,129,0.25)' : '0 0 0 2px rgba(16,185,129,0.15)',
            transition:      'all 0.15s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* Outlined left panel = collapsed sidebar */}
            <rect x="1" y="1" width="5" height="14" rx="1.5"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.2" />
            {/* Filled right panel = main content */}
            <rect x="7.5" y="1" width="7.5" height="14" rx="1.5"
              fill="rgba(255,255,255,0.9)" />
            {/* Right-pointing chevron inside left panel */}
            <polyline
              points="5,5.5 7,8 5,10.5"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* ── Main column ────────────────────────────────────────────────── */}
      <div style={{
        marginLeft:    isMobile ? '0' : sidebarOpen ? '240px' : '0',
        transition:    'margin-left 0.25s ease',
        flex:          1,
        display:       'flex',
        flexDirection: 'column',
        overflow:      'hidden',
        minWidth:      0,
      }}>
        {/* Mobile top bar (hamburger) */}
        {isMobile && !sidebarOpen && (
          <div style={{
            height:          '48px',
            display:         'flex',
            alignItems:      'center',
            padding:         '0 16px',
            borderBottom:    '1px solid #F0FDF4',
            backgroundColor: '#FAFAFA',
            flexShrink:      0,
          }}>
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              style={{
                background:   'none',
                border:       '1px solid #E5E7EB',
                borderRadius: '6px',
                cursor:       'pointer',
                padding:      '6px 8px',
                display:      'flex',
                alignItems:   'center',
                color:        '#6B7280',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Alert banner zone */}
        <div style={{ flexShrink: 0 }}>
          <AlertBannerZone alerts={visibleAlerts} onDismiss={handleDismiss} isMobile={isMobile} />
        </div>

        {/* Scrollable main content */}
        <div style={{
          flex:      1,
          overflowY: 'auto',
          padding:   isMobile ? '16px 16px 48px' : '28px 28px 48px',
        }}>
          <PageHeader isMobile={isMobile} />

          {/* KPI Row */}
          <KPIRow isMobile={isMobile} />

          {/* Cost Drain Meters */}
          <SectionDivider label="Cost Drain Meters — % of Revenue" />
          <div style={{ marginTop: '20px' }}>
            <CostDrainMeters isMobile={isMobile} />
          </div>

          {/* Technician Table */}
          <SectionDivider label="Technician Cost Analysis" />
          <div style={{ marginTop: '20px' }}>
            <TechnicianTable />
          </div>

          {/* Bottom padding spacer */}
          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  )
}
