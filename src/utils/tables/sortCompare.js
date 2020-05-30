import moment from 'moment';
import toString from './toString';

export default (
  aRow,
  bRow,
  key,
  sortDesc,
  formatter,
  compareOptions,
  compareLocale
) => {
  const a = aRow[key]; // or use Lodash `_.get()`
  const b = bRow[key];
  if (typeof a === 'number' && typeof b === 'number') {
    // If both compared fields are native numbers
    return a < b ? -1 : a > b ? 1 : 0;
  } else if (
    moment(a, 'MMMM Do YYYY, h:mm a').isValid() &&
    moment(b, 'MMMM Do YYYY, h:mm a').isValid()
  ) {
    // If both compared fields are dates
    const ai = moment(a, 'MMMM Do YYYY, h:mm a');
    const bi = moment(b, 'MMMM Do YYYY, h:mm a');
    return ai.isBefore(bi) ? -1 : ai.isAfter(bi) ? 1 : 0;
  } else {
    // Otherwise stringify the field data and use String.prototype.localeCompare
    return toString(a).localeCompare(
      toString(b),
      compareLocale,
      compareOptions
    );
  }
};
