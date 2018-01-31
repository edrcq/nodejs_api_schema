var crypto = require('crypto');
var store = null;

function UserController() {}


// Load user from database
UserController.load = () => {
    console.log('Loading Users');
    store.userList = {
        'user1': {
            _id: '1',
            username: 'user1',
            password: 'pass'
        },
        'user2': {
            _id: '2',
            username: 'user2',
            password: 'pass'
        },
    }
}

UserController.checkAuth = (data, client) => {
    if (data.authToken) {
        if (sotre.users[authToken]) {
            store.users[authToken] = store.userList[data.username];
            store.clients[client.id]['authToken'] = authToken;
            store.clients[client.id]['socket'] = client;
            return ({ authToken, user });
        }
    }
    if (store.userList.hasOwnProperty(data.username) && data.hasOwnProperty('username')) {
        if (store.userList[data.username].password == data.password) {
            var user = store.userList[data.username];
            var authToken = crypto.randomBytes(48).toString('hex');
            store.users[authToken] = store.userList[data.username];
            store.clients[client.id]['authToken'] = authToken;
            return ({ authToken, user });
        }
        console.log('no logged', data);
    }
    console.log('nop', data, store.users);
    console.log(store);
    return ({ role: 'none', authToken: 'none', user: 'visitor' });
}



module.exports = function(data) {
    store = data.store;
    console.log(store);
    if (store == null || !store.users) {
        console.error('UserController store error');
        process.exit(1);
    }
    UserController.load();
    return (UserController);
};