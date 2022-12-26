import formatter from './formatter';

interface ExcludeTimesParams {
  excludeTime: string;
  type: 'am' | 'pm';
}

const excludeTimes = ({ excludeTime, type }: ExcludeTimesParams) => {
  let time: string[] = [];

  switch (type) {
    case 'am':
      for (let i = 0; i < 12; i++) {
        const hour = excludeTime.split(':')[0];
        const minutes = excludeTime.split(':')[1];

        if (Number(hour) > i) continue;

        if (Number(hour) === i && minutes === '30') {
          time.push(`${formatter.zeroPad(i)}:30`);
          continue;
        }

        time.push(`${formatter.zeroPad(i)}:00`);
        time.push(`${formatter.zeroPad(i)}:30`);
      }
      break;

    case 'pm':
      for (let i = 12; i < 24; i++) {
        const hour = excludeTime.split(':')[0];
        const minutes = excludeTime.split(':')[1];

        if (Number(hour) === i && minutes === '30') {
          time.push(`${i}:00`);
          continue;
        }

        if (Number(hour) <= i) continue;

        time.push(`${i}:00`);
        time.push(`${i}:30`);
      }
      break;

    default:
      break;
  }

  return time;
};

export default excludeTimes;
