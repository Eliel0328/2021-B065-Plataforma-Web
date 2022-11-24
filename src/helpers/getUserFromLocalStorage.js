const getUserFromLocalStorage = () => {
    const userData = sessionStorage.getItem('user');
    const user = JSON.parse(userData);

    return user;
};

export default getUserFromLocalStorage;
