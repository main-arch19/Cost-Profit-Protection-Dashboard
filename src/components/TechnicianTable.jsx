import { useState } from 'react'
import { technicians } from '../data/mockData.js'
import {
  CARD_BASE, FONTS,
  TABLE_HEADER, TABLE_CELL,
  ACTION_BTN_RED, ACTION_BTN_AMBER, ACTION_BTN_GREEN_MUTED, ACTION_BTN_OUTLINE,
  MONO_CURRENCY,
} from '../styles/tokens.js'
import { formatCurrency, formatPercent, getSeverityColor, getFixRateColor } from '../utils/formatters.js'

// ─── Column Definitions ───────────────────────────────────────────────────────
const COLUMNS = [
  { key: 'name',             label: 'Technician',      align: 'left',   mono: false, width: '140px' },
  { key: 'callbackCount',    label: 'CBs',             align: 'right',  mono: true,  width: '60px'  },
  { key: 'callbackCost',     label: 'Callback Cost',   align: 'right',  mono: true,  width: '120px' },
  { key: 'idleHours',        label: 'Idle Hrs',        align: 'right',  mono: true,  width: '80px'  },
  { key: 'totalCost',        label: 'Total Drain',     align: 'right',  mono: true,  width: '120px' },
  { key: 'firstTimeFixRate', label: 'Fix Rate',        align: 'right',  mono: true,  width: '90px'  },
  { key: 'severity',         label: 'Status',          align: 'center', mono: false, width: '120px' },
]

// ─── Sort function ────────────────────────────────────────────────────────────
function sortTechnicians(techs, key, dir) {
  const severityOrder = { red: 0, amber: 1, green: 2 }

  return [...techs].sort((a, b) => {
    let aVal = a[key]
    let bVal = b[key]

    if (key === 'severity') {
      aVal = severityOrder[aVal]
      bVal = severityOrder[bVal]
    }

    if (typeof aVal === 'string' && key !== 'severity') {
      return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }

    return dir === 'asc' ? aVal - bVal : bVal - aVal
  })
}

// ─── Technician Avatar ────────────────────────────────────────────────────────
function TechAvatar({ initials, severity }) {
  const color = getSeverityColor(severity)
  return (
    <div style={{
      width:           '32px',
      height:          '32px',
      borderRadius:    '50%',
      backgroundColor: `${color}18`,
      border:          `1px solid ${color}40`,
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      fontFamily:      FONTS.mono,
      fontSize:        '11px',
      fontWeight:      '600',
      color:           color,
      flexShrink:      0,
    }}>
      {initials}
    </div>
  )
}

// ─── Severity Dot + Label ─────────────────────────────────────────────────────
function SeverityBadge({ severity }) {
  const color = getSeverityColor(severity)
  const labels = { red: 'Critical', amber: 'Watch', green: 'Resolved' }

  return (
    <div style={{
      display:         'inline-flex',
      alignItems:      'center',
      gap:             '6px',
      padding:         '3px 8px',
      borderRadius:    '12px',
      backgroundColor: `${color}14`,
      border:          `1px solid ${color}30`,
    }}>
      <span style={{
        width:           '6px',
        height:          '6px',
        borderRadius:    '50%',
        backgroundColor: color,
        flexShrink:      0,
        display:         'inline-block',
      }} />
      <span style={{
        fontFamily: FONTS.ui,
        fontSize:   '11px',
        fontWeight: '600',
        color:      color,
      }}>
        {labels[severity]}
      </span>
    </div>
  )
}

// ─── Row Action Buttons ───────────────────────────────────────────────────────
function RowActions({ severity }) {
  const [hoveredBtn, setHoveredBtn] = useState(null)

  if (severity === 'red') {
    return (
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
        <button
          style={{
            ...ACTION_BTN_RED,
            opacity: hoveredBtn === 'primary' ? 0.88 : 1,
          }}
          onMouseEnter={() => setHoveredBtn('primary')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          Investigate
        </button>
        <button
          style={{
            ...ACTION_BTN_OUTLINE,
            opacity: hoveredBtn === 'secondary' ? 0.7 : 1,
          }}
          onMouseEnter={() => setHoveredBtn('secondary')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          Assign
        </button>
      </div>
    )
  }

  if (severity === 'amber') {
    return (
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
        <button
          style={{
            ...ACTION_BTN_AMBER,
            opacity: hoveredBtn === 'primary' ? 0.88 : 1,
          }}
          onMouseEnter={() => setHoveredBtn('primary')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          Review
        </button>
        <button
          style={{
            ...ACTION_BTN_OUTLINE,
            opacity: hoveredBtn === 'secondary' ? 0.7 : 1,
          }}
          onMouseEnter={() => setHoveredBtn('secondary')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          Monitor
        </button>
      </div>
    )
  }

  // green — resolved
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button style={{ ...ACTION_BTN_GREEN_MUTED }}>
        ✓ Resolved
      </button>
    </div>
  )
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────
function SortIcon({ active, dir }) {
  if (!active) {
    return (
      <span style={{ color: '#D1D5DB', fontSize: '10px', marginLeft: '4px' }}>↕</span>
    )
  }
  return (
    <span style={{ color: '#10B981', fontSize: '10px', marginLeft: '4px' }}>
      {dir === 'asc' ? '↑' : '↓'}
    </span>
  )
}

// ─── Technician Table ─────────────────────────────────────────────────────────
export default function TechnicianTable() {
  const [sortKey, setSortKey]       = useState('totalCost')
  const [sortDir, setSortDir]       = useState('desc')
  const [hoveredRow, setHoveredRow] = useState(null)
  const [hoveredCol, setHoveredCol] = useState(null)

  const sorted = sortTechnicians(technicians, sortKey, sortDir)

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <section>
      {/* Section header */}
      <div style={{
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'space-between',
        marginBottom:   '16px',
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
            Technician Cost Analysis
          </h2>
          <p style={{
            fontFamily: FONTS.ui,
            fontSize:   '13px',
            color:      '#9CA3AF',
            margin:     0,
          }}>
            Click column headers to sort · Red = critical drain · Amber = watch · Green = resolved
          </p>
        </div>

        {/* Summary chips */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[
            { color: '#EF4444', label: '2 Critical', bg: '#FEF2F2', border: '#FECACA' },
            { color: '#F59E0B', label: '2 Watch',    bg: '#FFFBEB', border: '#FDE68A' },
            { color: '#10B981', label: '2 Resolved', bg: '#ECFDF5', border: '#A7F3D0' },
          ].map(chip => (
            <div key={chip.label} style={{
              fontFamily:      FONTS.ui,
              fontSize:        '11px',
              fontWeight:      '600',
              color:           chip.color,
              backgroundColor: chip.bg,
              border:          `1px solid ${chip.border}`,
              borderRadius:    '10px',
              padding:         '3px 10px',
            }}>
              {chip.label}
            </div>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div style={{ ...CARD_BASE, padding: 0, overflow: 'hidden' }}>
        <table style={{
          width:          '100%',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr>
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    ...TABLE_HEADER,
                    textAlign:       col.align,
                    width:           col.width,
                    backgroundColor: hoveredCol === col.key ? '#F0FDF4' : '#FAFAFA',
                  }}
                  onMouseEnter={() => setHoveredCol(col.key)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  {col.label}
                  <SortIcon active={sortKey === col.key} dir={sortDir} />
                </th>
              ))}
              {/* Actions column (not sortable) */}
              <th style={{
                ...TABLE_HEADER,
                textAlign: 'right',
                cursor:    'default',
                width:     '180px',
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(tech => {
              const borderColor = getSeverityColor(tech.severity)
              const isHovered = hoveredRow === tech.id

              return (
                <tr
                  key={tech.id}
                  onMouseEnter={() => setHoveredRow(tech.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    backgroundColor: isHovered ? '#F1FAF6' : '#FFFFFF',
                    borderLeft: tech.severity === 'red'
                      ? '3px solid #EF4444'
                      : tech.severity === 'amber'
                      ? '2px solid #F59E0B'
                      : '2px solid #10B981',
                    transition: 'background-color 0.12s ease',
                  }}
                >
                  {/* Technician name + avatar */}
                  <td style={{ ...TABLE_CELL, paddingLeft: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <TechAvatar initials={tech.initials} severity={tech.severity} />
                      <div>
                        <div style={{
                          fontFamily: FONTS.ui,
                          fontWeight: '600',
                          fontSize:   '14px',
                          color:      '#111827',
                        }}>
                          {tech.name}
                        </div>
                        <div style={{
                          fontFamily: FONTS.mono,
                          fontSize:   '11px',
                          color:      '#9CA3AF',
                        }}>
                          {tech.jobsThisMonth} jobs · avg {formatCurrency(tech.avgTicket)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Callback count */}
                  <td style={{
                    ...TABLE_CELL,
                    ...MONO_CURRENCY,
                    textAlign: 'right',
                    color:     tech.callbackCount > 4 ? '#EF4444' : '#111827',
                    fontWeight: tech.callbackCount > 4 ? '600' : '500',
                  }}>
                    {tech.callbackCount}
                  </td>

                  {/* Callback cost */}
                  <td style={{ ...TABLE_CELL, ...MONO_CURRENCY }}>
                    <span style={{
                      color: tech.callbackCost > 800 ? '#EF4444' : '#111827',
                    }}>
                      {formatCurrency(tech.callbackCost)}
                    </span>
                  </td>

                  {/* Idle hours */}
                  <td style={{
                    ...TABLE_CELL,
                    ...MONO_CURRENCY,
                    color: tech.idleHours > 10 ? '#F59E0B' : '#111827',
                  }}>
                    {tech.idleHours}h
                  </td>

                  {/* Total drain cost */}
                  <td style={{ ...TABLE_CELL, ...MONO_CURRENCY }}>
                    <span style={{
                      color:      borderColor,
                      fontWeight: '600',
                      fontSize:   '13px',
                    }}>
                      {formatCurrency(tech.totalCost)}
                    </span>
                  </td>

                  {/* First-time fix rate — dual-direction: high = green */}
                  <td style={{
                    ...TABLE_CELL,
                    ...MONO_CURRENCY,
                    color: getFixRateColor(tech.firstTimeFixRate),
                    fontWeight: '600',
                  }}>
                    {formatPercent(tech.firstTimeFixRate)}
                  </td>

                  {/* Severity badge */}
                  <td style={{ ...TABLE_CELL, textAlign: 'center' }}>
                    <SeverityBadge severity={tech.severity} />
                  </td>

                  {/* Actions */}
                  <td style={{ ...TABLE_CELL, textAlign: 'right', paddingRight: '16px' }}>
                    <RowActions severity={tech.severity} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Table footer */}
        <div style={{
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'center',
          padding:         '12px 16px',
          borderTop:       '1px solid #F3F4F6',
          backgroundColor: '#FAFAFA',
        }}>
          <span style={{
            fontFamily: FONTS.ui,
            fontSize:   '12px',
            color:      '#6B7280',
          }}>
            Showing all {technicians.length} technicians · February 2026
          </span>
          <span style={{
            fontFamily: FONTS.mono,
            fontSize:   '12px',
            fontWeight: '600',
            color:      '#EF4444',
          }}>
            Total: {formatCurrency(technicians.reduce((s, t) => s + t.totalCost, 0))}/mo
          </span>
        </div>
      </div>
    </section>
  )
}
