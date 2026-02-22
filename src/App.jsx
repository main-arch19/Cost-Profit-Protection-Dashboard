import { useState } from 'react'
import { alerts } from './data/mockData.js'
import { FONTS } from './styles/tokens.js'
import Sidebar from './components/Sidebar.jsx'
import AlertBannerZone from './components/AlertBannerZone.jsx'
import KPIRow from './components/KPIRow.jsx'
import CostDrainMeters from './components/CostDrainMeters.jsx'
import TechnicianTable from './components/TechnicianTable.jsx'

// ─── Page Header ──────────────────────────────────────────────────────────────
function PageHeader() {
  return (
    <div style={{
      display:        'flex',
      alignItems:     'flex-start',
      justifyContent: 'space-between',
      marginBottom:   '28px',
    }}>
      <div>
        <h1 style={{
          fontFamily:    FONTS.ui,
          fontSize:      '22px',
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
        {/* Live dot */}
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
  const [activeNav, setActiveNav]           = useState('cost-drains')
  const [dismissedAlerts, setDismissedAlerts] = useState([])

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
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* ── Main column (offset by sidebar width) ─────────────────────── */}
      <div style={{
        marginLeft:    '240px',
        flex:          1,
        display:       'flex',
        flexDirection: 'column',
        overflow:      'hidden',
        minWidth:      0,
      }}>
        {/* Alert banner zone — 48px minimum, expands with banners */}
        <div style={{ flexShrink: 0 }}>
          <AlertBannerZone alerts={visibleAlerts} onDismiss={handleDismiss} />
        </div>

        {/* Scrollable main content */}
        <div style={{
          flex:      1,
          overflowY: 'auto',
          padding:   '28px 28px 48px',
        }}>
          <PageHeader />

          {/* KPI Row */}
          <KPIRow />

          {/* Cost Drain Meters */}
          <SectionDivider label="Cost Drain Meters — % of Revenue" />
          <div style={{ marginTop: '20px' }}>
            <CostDrainMeters />
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
