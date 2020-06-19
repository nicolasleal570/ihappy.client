import moment from 'moment';

export default (date: Date) => {
  const a = moment(date);
  const b = moment(new Date());
  const diff = Math.abs(a.diff(b, 'days'));
  return diff;
};
