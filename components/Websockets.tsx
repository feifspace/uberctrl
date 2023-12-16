import { io } from 'socket.io-client/dist/socket.io';

let helper = io('https://' + (process.env.NODE_ENV == 'development' ? 'dev' : 'api') + '.feif.space/uberctrl', {autoConnect: false, query: {}});

let space = false;

export const connect = (data) => {
    return new Promise(function(resolve, reject) {
        space = io('https://' + data.url + '/uberctrl', { autoConnect: false, query: {} });
        space.on('connect', () => {
            resolve(true);
        });
        
        setTimeout(() => {
            reject(false);
        }, 1500);
        
        space.connect();
    });
};

export const disconnect = () => {
    return new Promise(function(resolve, reject) {
        space.disconnect();
    });
};

export const onDisconnect = () => {
    return new Promise(function(resolve, reject) {
        space.on('disconnect', () => {
            resolve(true);
        });
    });
};

export const onReconnect = () => {
    return new Promise(function(resolve, reject) {
        space.io.on("reconnect", () => {
            resolve(true);
        });
    });
};

export const submitCommand = (target, data) => {
    return new Promise(function(resolve, reject) {
        space.on("execute", data, (res) => {
            resolve(res);
        });
    });
};

export const connectHelper = () => {
    return new Promise(function(resolve, reject) {
        helper.on('connect', () => {
            resolve(true);
        });
        
        helper.connect();
        
        setTimeout(() => {
            if (!helper.connected) {
                reject(false);
            }
        }, 3000);
    });
};