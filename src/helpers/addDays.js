const addDays = (actual, days) => {
    let aux = new Date(actual);
    aux.setDate(aux.getDate() + days);
    return aux;
};

export default addDays;