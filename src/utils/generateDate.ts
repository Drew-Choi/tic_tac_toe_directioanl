import moment from 'moment-timezone';

export const nowDayAndTimeOnlyNumber = ({
  format = 'YYYY/MM/DD/HH:mm:ss',
}: {
  format?:
    | 'YYYY/MM/DD/HH:mm:ss'
    | 'YYYY/MM/DD/HH:mm'
    | 'YYYY/MM/DD/HH'
    | 'YYYY/MM/DD'
    | 'YYYY/MM'
    | 'YYYY';
}) => {
  const koreanTime = moment().tz('Asia/Seoul');

  return koreanTime.format(format);
};
