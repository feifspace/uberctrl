import { io } from 'socket.io-client/dist/socket.io';

let socket = io('https://' + (process.env.NODE_ENV == 'development' ? 'dev' : 'api') + '.feif.space/uberctrl', {autoConnect: false, query: {}});
   /*let deviceid = await getData('deviceid');
    
    socket.emit('booting', { deviceid: deviceid }, (res) => {
        global.user = Object.assign(res.user, { version: Constants.manifest.version });
    });*/

export const connect = () => {
    return new Promise(function(resolve, reject) {
        socket.on('connect', () => {
            resolve(true);
        });
            
            
        setTimeout(() => {
            reject(false);
        }, 1500);
        
        socket.connect();
    });
};

export const onDisconnect = () => {
    return new Promise(function(resolve, reject) {
        socket.on('disconnect', () => {
            resolve(true);
        });
    });
};

export const onReconnect = () => {
    return new Promise(function(resolve, reject) {
        socket.io.on("reconnect", () => {
            resolve(true);
        });
    });
};

export const submitCommand = (data) => {
    return new Promise(function(resolve, reject) {
        socket.io.on("execute", data, (res) => {
            resolve(res);
        });
    });
};

export const sendContactForm = (name, email, message, phone) => {
    return new Promise(function(resolve, reject) {
        socket.emit('sendContactForm', { name, email, message, phone }, (res) => {
            if (res) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

export const saveUserSignature = () => {
    return new Promise(function(resolve, reject) {
        if (socket.connected) {
            resolve(true);
        } else {
        }
    });
};

export const uploadImages = (data, callback) => {
    socket.emit('uploadImages', data, (response) => {
        callback(response);
    });
};