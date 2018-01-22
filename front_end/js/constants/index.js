'use strict';

export const ALL = 'all';
export const COMPLETE = 'complete';
export const RUNNING = 'running';
export const ERROR = 'error';
export const BUTTON_OPTIONS = [
  ALL,
  COMPLETE,
  RUNNING,
  ERROR
];

export const START_JOB = 'Start Job';
export const CANCEL_JOB = 'Cancel';

export const ICON_COMPLETE = 'https://support.sugarsync.com/hc/en-us/article_attachments/205853998/synced-320px.png';
export const ICON_RUNNING = 'https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/sync_reload_refresh_arrow-512.png';
export const ICON_ERROR = 'https://visualpharm.com/assets/463/Do%20Not%20Disturb-595b40b65ba036ed117d2c1b.svg';
export const STATUS_ICONS = {
  [COMPLETE]: ICON_COMPLETE,
  [RUNNING]: ICON_RUNNING,
  [ERROR]: ICON_ERROR
};

export const CARD_ACTION_RERUN = 're-run';
export const CARD_ACTION_LOGS = 'Logs';
export const CARD_ACTION_CONFIGS = 'Configs';
export const CARD_ACTION_DELETE = 'Delete';

export const VALIDATION_ERROR = 'You must enter something';