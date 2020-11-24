const SecureStorage = require('nativescript-secure-storage').SecureStorage;

let secureStorage = new SecureStorage();

function tokenComprobe() {
    if(secureStorage.isFirstRunSync()) {
        secureStorage.setSync({
            key: "token",
            value: ""
        });

        return "";
    }

    return secureStorage.getSync({
        key: "token"
    });
}

function newToken(params) {
    tokenDestroy();

    return secureStorage.setSync({
        key: "token",
        value: params
    });
}

function token() {
    return secureStorage.getSync({
        key: "token"
    });
}

function tokenDestroy() {
    return secureStorage.removeSync({
        key: "token"
    });
}

module.exports = {
    tokenComprobe,
    newToken,
    token,
    tokenDestroy
};