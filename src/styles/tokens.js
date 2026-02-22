// ─── Design Tokens ──────────────────────────────────────────────────────────
// Single source of truth for all hex values, font names, and base style objects.
// Every component imports from here — never hardcode colors inline.

export const COLORS = {
  savingsGreen:    '#10B981',
  savingsGreenDark:'#065F46',
  savingsGreenBg:  '#ECFDF5',
  savingsGreenBorder: '#D1FAE5',

  drainRed:        '#EF4444',
  drainRedDark:    '#7F1D1D',
  drainRedBg:      'rgba(239,68,68,0.06)',
  drainRedMid:     '#991B1B',

  warningAmber:    '#F59E0B',
  warningAmberDark:'#78350F',
  warningAmberBg:  'rgba(245,158,11,0.06)',
  warningAmberMid: '#92400E',

  infoBlueBorder:  '#3B82F6',
  infoBlueBg:      'rgba(59,130,246,0.06)',
  infoBlueDark:    '#1E3A8A',

  bodyText:        '#111827',
  secondary:       '#6B7280',
  muted:           '#9CA3AF',
  hover:           '#F1FAF6',

  cardBg:          '#FFFFFF',
  cardBorder:      '#D1FAE5',

  sidebarBg:       '#FAFAFA',
  sidebarBorder:   '#F0FDF4',

  pageBg:          '#FFFFFF',
  tableRowAlt:     '#FAFAFA',
  tableRowHover:   '#F1FAF6',
  tableBorderLight:'#F3F4F6',

  activeNavBg:     'rgba(16,185,129,0.1)',
  activeNavText:   '#065F46',
  activeNavBorder: '#10B981',
}

export const FONTS = {
  ui:   "'IBM Plex Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
}

// ─── Card Base ───────────────────────────────────────────────────────────────
export const CARD_BASE = {
  backgroundColor: '#FFFFFF',
  border:          '1px solid #D1FAE5',
  borderRadius:    '8px',
  boxShadow:       '0 1px 3px rgba(0,0,0,0.06)',
  padding:         '24px',
  fontFamily:      FONTS.ui,
}

export const KPI_CARD_GREEN = {
  ...CARD_BASE,
  borderTop: '2px solid #10B981',
}

export const KPI_CARD_RED = {
  ...CARD_BASE,
  borderTop: '2px solid #EF4444',
}

export const KPI_CARD_AMBER = {
  ...CARD_BASE,
  borderTop: '2px solid #F59E0B',
}

export const KPI_CARD_NEUTRAL = {
  ...CARD_BASE,
  borderTop: '2px solid #6B7280',
}

// ─── Typography ──────────────────────────────────────────────────────────────
export const KPI_LABEL = {
  fontFamily:    FONTS.ui,
  fontSize:      '11px',
  fontWeight:    '600',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color:         '#6B7280',
  marginBottom:  '8px',
}

export const KPI_VALUE = {
  fontFamily:    FONTS.mono,
  fontSize:      '28px',
  fontWeight:    '600',
  color:         '#111827',
  letterSpacing: '-0.02em',
  lineHeight:    '1.2',
  margin:        '0 0 8px 0',
}

export const MONO_CURRENCY = {
  fontFamily: FONTS.mono,
  fontSize:   '13px',
  fontWeight: '500',
  textAlign:  'right',
}

export const MONO_VALUE = {
  fontFamily: FONTS.mono,
  fontWeight: '500',
}

// ─── Table ───────────────────────────────────────────────────────────────────
export const TABLE_HEADER = {
  fontFamily:    FONTS.ui,
  fontSize:      '11px',
  fontWeight:    '600',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color:         '#6B7280',
  padding:       '10px 14px',
  textAlign:     'left',
  borderBottom:  '1px solid #D1FAE5',
  cursor:        'pointer',
  userSelect:    'none',
  whiteSpace:    'nowrap',
  backgroundColor: '#FAFAFA',
}

export const TABLE_CELL = {
  fontFamily:   FONTS.ui,
  fontSize:     '14px',
  color:        '#111827',
  padding:      '12px 14px',
  borderBottom: '1px solid #F3F4F6',
  verticalAlign:'middle',
}

// ─── Sidebar Nav ─────────────────────────────────────────────────────────────
export const SIDEBAR_NAV_ITEM_BASE = {
  display:         'flex',
  alignItems:      'center',
  gap:             '10px',
  padding:         '0 12px',
  height:          '40px',
  borderRadius:    '6px',
  cursor:          'pointer',
  fontSize:        '14px',
  fontWeight:      '500',
  color:           '#374151',
  fontFamily:      FONTS.ui,
  borderLeft:      '2px solid transparent',
  marginBottom:    '2px',
  transition:      'background-color 0.12s ease',
  textDecoration:  'none',
  listStyle:       'none',
}

export const SIDEBAR_NAV_ITEM_ACTIVE = {
  ...SIDEBAR_NAV_ITEM_BASE,
  backgroundColor: 'rgba(16,185,129,0.1)',
  borderLeft:      '2px solid #10B981',
  color:           '#065F46',
  fontWeight:      '600',
}

// ─── Buttons ─────────────────────────────────────────────────────────────────
export const ACTION_BTN_BASE = {
  fontFamily:   FONTS.ui,
  fontSize:     '12px',
  fontWeight:   '600',
  padding:      '5px 10px',
  borderRadius: '4px',
  border:       'none',
  cursor:       'pointer',
  lineHeight:   '1.4',
  whiteSpace:   'nowrap',
}

export const ACTION_BTN_RED = {
  ...ACTION_BTN_BASE,
  backgroundColor: '#EF4444',
  color:           '#FFFFFF',
}

export const ACTION_BTN_AMBER = {
  ...ACTION_BTN_BASE,
  backgroundColor: '#F59E0B',
  color:           '#FFFFFF',
}

export const ACTION_BTN_GREEN_MUTED = {
  ...ACTION_BTN_BASE,
  backgroundColor: '#ECFDF5',
  color:           '#065F46',
  border:          '1px solid #D1FAE5',
  cursor:          'default',
}

export const ACTION_BTN_OUTLINE = {
  ...ACTION_BTN_BASE,
  backgroundColor: '#FFFFFF',
  color:           '#374151',
  border:          '1px solid #D1FAE5',
}
