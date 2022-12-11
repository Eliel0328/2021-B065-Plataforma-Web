const setFormatTime = (date) => {
    let a = new Date(date);
    let aux =
        (a.getHours() + 6) % 24 < 10
            ? `0${(a.getHours() + 6) % 24}`
            : (a.getHours() + 6) % 24;
    let aux2 = a.getMonth() + 1 < 10 ? `0${a.getMonth() + 1}` : a.getMonth() + 1;
    let aux3 = a.getDate() < 10 ? `0${a.getDate()}` : a.getDate();
    let aux4 = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
    // return `${a.getFullYear()}-${a.getMonth()}-${a.getDate()}  ${a.getHours()}:${a.getMinutes()}`;
    return `${a.getFullYear()}-${aux2}-${aux3}  ${aux}:${aux4}`;
};

export default setFormatTime;