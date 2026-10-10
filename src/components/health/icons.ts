/**
 * Single source of truth for the health-services icon set.
 *
 * The raw SVG inner markup lives here so the *same* icon can be rendered by an
 * Astro component (`HealthIcon.astro`, zero JS) and by a React island
 * (`<Icon />`), without duplicating path data.
 *
 * All icons are 24x24, stroke-based, `currentColor`, 1.75 stroke width so they
 * read as one family next to the site's existing minimal style.
 * Content is authored in this repo (never user input) so `set:html` is safe.
 */
export type IconName =
  | 'card'
  | 'training'
  | 'shield'
  | 'audit'
  | 'phone'
  | 'pin'
  | 'clock'
  | 'doc'
  | 'share'
  | 'check'
  | 'alert'
  | 'users'
  | 'calendar'
  | 'heart'
  | 'info'
  | 'copy'
  | 'sms'
  | 'chevron'
  | 'search'
  | 'qr'
  | 'wallet'
  | 'clipboard';

export const ICON_PATHS: Record<IconName, string> = {
  card: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><circle cx="8.5" cy="10.5" r="2.25"/><path d="M5 16.25c.7-1.6 2-2.4 3.5-2.4s2.8.8 3.5 2.4"/><path d="M15 9.5h4M15 13h4"/>',
  training: '<path d="M12 4 2.75 8.4 12 12.8l9.25-4.4L12 4Z"/><path d="M6.5 10.6v4.2c0 1.7 2.5 3.1 5.5 3.1s5.5-1.4 5.5-3.1v-4.2"/><path d="M21.25 8.4v5.4"/>',
  shield: '<path d="M12 2.75 4.75 5.6v6c0 4.2 3 7.9 7.25 9.65C16.25 19.5 19.25 15.8 19.25 11.6v-6L12 2.75Z"/><path d="m8.9 11.9 2.2 2.2 4-4.2"/>',
  audit: '<rect x="4.5" y="3.5" width="15" height="17" rx="2.25"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/><path d="m16.25 15.4 1.3 1.3 2.7-2.9"/>',
  phone: '<path d="M6.4 3.75h3l1.4 3.6-1.9 1.4a11.4 11.4 0 0 0 5.35 5.35l1.4-1.9 3.6 1.4v3a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 4.4 5.95a2 2 0 0 1 2-2.2Z"/>',
  pin: '<path d="M12 21.25s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10.1" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="9.25"/><path d="M12 6.9V12l3.4 2.1"/>',
  doc: '<path d="M13.5 2.75H7.25a2 2 0 0 0-2 2v14.5a2 2 0 0 0 2 2h9.5a2 2 0 0 0 2-2V8.25l-5.25-5.5Z"/><path d="M13.4 2.9v5.4h5.3"/><path d="M8.75 13h6.5M8.75 16.5h4.5"/>',
  share: '<circle cx="17.75" cy="5.75" r="2.75"/><circle cx="6.25" cy="12" r="2.75"/><circle cx="17.75" cy="18.25" r="2.75"/><path d="m8.7 10.7 6.6-3.6M8.7 13.3l6.6 3.6"/>',
  check: '<path d="m4.75 12.5 4.5 4.5 10-10.5"/>',
  alert: '<path d="M12 3.5 2.75 19.5h18.5L12 3.5Z"/><path d="M12 9.75v4.1"/><circle cx="12" cy="16.6" r=".9" fill="currentColor" stroke="none"/>',
  users: '<circle cx="9.25" cy="8.25" r="3.5"/><path d="M2.75 19.5c.7-3.3 3.3-5 6.5-5s5.8 1.7 6.5 5"/><path d="M16.25 5.1a3.5 3.5 0 0 1 0 6.6M17.6 14.9c2.1.6 3.4 2.2 3.9 4.6"/>',
  calendar: '<rect x="3.25" y="5" width="17.5" height="16" rx="2.25"/><path d="M3.25 9.75h17.5M8 3v4M16 3v4"/><path d="M7.5 13.5h2.25M14.25 13.5h2.25M7.5 17h2.25M14.25 17h2.25"/>',
  heart: '<path d="M12 20.5S3.5 15.4 3.5 9.4A4.65 4.65 0 0 1 12 6.6a4.65 4.65 0 0 1 8.5 2.8c0 6-8.5 11.1-8.5 11.1Z"/><path d="M3.9 12.4h3.4l1.5-2.3 1.8 4 1.6-2.7 1.2 1h4.9"/>',
  info: '<circle cx="12" cy="12" r="9.25"/><path d="M12 11v5.5"/><circle cx="12" cy="7.9" r=".95" fill="currentColor" stroke="none"/>',
  copy: '<rect x="8.75" y="8.75" width="12.5" height="12.5" rx="2.25"/><path d="M15.25 5.5a2 2 0 0 0-2-2H5.5a2 2 0 0 0-2 2v7.75a2 2 0 0 0 2 2"/>',
  sms: '<path d="M20.75 12.4c0 3.9-3.9 7-8.75 7-1.2 0-2.35-.2-3.4-.55L3.75 20.75l1.35-3.6A6.6 6.6 0 0 1 3.25 12.4c0-3.9 3.9-7 8.75-7s8.75 3.1 8.75 7Z"/><path d="M8.5 12h7"/>',
  chevron: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
  search: '<circle cx="10.75" cy="10.75" r="6.75"/><path d="m15.75 15.75 4.5 4.5"/>',
  qr: '<rect x="3.25" y="3.25" width="7" height="7" rx="1.5"/><rect x="13.75" y="3.25" width="7" height="7" rx="1.5"/><rect x="3.25" y="13.75" width="7" height="7" rx="1.5"/><path d="M13.75 13.75h3v3h-3zM20.75 13.75v3M17.75 20.75h3M13.75 20.75h1"/>',
  wallet: '<rect x="2.75" y="5.75" width="18.5" height="13" rx="2.5"/><path d="M2.75 10h18.5"/><circle cx="17" cy="14.5" r="1.2" fill="currentColor" stroke="none"/>',
  clipboard: '<path d="M9 4.25H7.25a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9.5a2 2 0 0 0 2-2v-13a2 2 0 0 0-2-2H15"/><rect x="9" y="2.75" width="6" height="3.5" rx="1.25"/><path d="m9.25 13.25 1.9 1.9 3.6-3.9"/>',
};

export const ICON_VIEWBOX = '0 0 24 24';
