module.exports = {
    aceptablePassword:(value) => {
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
        return regex.test(value);
    },
    aceptableMail:(value) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value);
    }
}