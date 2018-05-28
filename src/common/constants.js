import i18n from './i18n';

export const daysOfWeek = {
  mon: i18n.t('other.daysOfTheWeek.monday'),
  tue: i18n.t('other.daysOfTheWeek.tuesday'),
  wed: i18n.t('other.daysOfTheWeek.wednesday'),
  thu: i18n.t('other.daysOfTheWeek.thursday'),
  fri: i18n.t('other.daysOfTheWeek.friday'),
  sat: i18n.t('other.daysOfTheWeek.saturday'),
};

export const daysByNumbers = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

export const engDays = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export const rusDays = [
  i18n.t('other.daysOfTheWeek_short.sunday'),
  i18n.t('other.daysOfTheWeek_short.monday'),
  i18n.t('other.daysOfTheWeek_short.tuesday'),
  i18n.t('other.daysOfTheWeek_short.wednesday'),
  i18n.t('other.daysOfTheWeek_short.thursday'),
  i18n.t('other.daysOfTheWeek_short.friday'),
  i18n.t('other.daysOfTheWeek_short.saturday'),
];

export const typeOfToast = {
  error: '#FFA9A9',
  info: '#ABE1FF',
  success: '#8FE8A4',
};