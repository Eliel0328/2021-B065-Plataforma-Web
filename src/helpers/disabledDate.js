import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);
// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
};

export default disabledDate;