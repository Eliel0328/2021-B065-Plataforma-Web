const setGreet = () => {
    let dt = new Date();
    let day = dt.getDay();
    let hour = dt.getHours();
    let minute = dt.getMinutes();

    let greet = '';

    if (hour < 12) {
        greet = 'Buenos Dias!';
    } else if (hour >= 12) {
        greet = 'Buenas Tardes!';
    } else if (hour >= 18) {
        greet = 'Buenas Noches!';
    } else {
        console.log(hour);
    }

    return greet;
};

export default setGreet;
