const getTokenFromLocalStorage = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
};

export default getTokenFromLocalStorage;
