/* Load external modules */
var io = require('socket.io')();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('apimakr', 'apimakr', 'dmROdYiTCFz7IJWq', {
    host: 'guiedo.com',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
const User = require('./api/users/UserModel')(sequelize);
User.sync().then(() => {});
  

sequelize
.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
    });

/* Load conf */
const confGlobal = require('./conf/global');

/* Load local store */
var store = require('./store');

/* Test */
var UserController = require('./api/users/UserController')({ store });

/* All Socket.IO Routes */
io.on('connection', function (client) {
    console.log('Connected', client.id);

    if (!store.clients.hasOwnProperty(client.id))
        store.clients[client.id] = {};
    store.clients[client.id]['socket'] = client;

    

    

    /* All routes */
    client.on('store', function (data) {
        console.log(client.role);
    });
    client.on('admin/users/load', function(data) {
        if (client.role == 'admin') {
            UserController.load();
        }
    })
    client.on('auth', (data) => {
        var authData = UserController.checkAuth(data, client);
        client.role = authData.user.role;
        client.emit('auth', { authToken: authData.authToken });
        console.log(store);
    });
    client.on('disconnect', function() {
        delete store.clients[client.id];
        console.log('Disconnected', client.id);
    });
});

io.listen(3042);

/* Client structure 

Socket {
  nsp:
   Namespace {
     name: '/',
     server:
      Server {
        nsps: [Object],
        _path: '/socket.io',
        _serveClient: true,
        parser: [Object],
        encoder: Encoder {},
        _adapter: [Function: Adapter],
        _origins: '*:*',
        sockets: [Circular],
        eio: [Object],
        httpServer: [Object],
        engine: [Object] },
     sockets: { HaJoMDiYVVGnDpxjAAAA: [Circular] },
     connected: { HaJoMDiYVVGnDpxjAAAA: [Circular] },
     fns: [],
     ids: 0,
     rooms: [],
     flags: {},
     adapter:
      Adapter {
        nsp: [Circular],
        rooms: [Object],
        sids: [Object],
        encoder: Encoder {} },
     _events: { connection: [Function] },
     _eventsCount: 1 },
  server:
   Server {
     nsps: { '/': [Object] },
     _path: '/socket.io',
     _serveClient: true,
     parser:
      { protocol: 4,
        types: [Array],
        CONNECT: 0,
        DISCONNECT: 1,
        EVENT: 2,
        ACK: 3,
        ERROR: 4,
        BINARY_EVENT: 5,
        BINARY_ACK: 6,
        Encoder: [Function: Encoder],
        Decoder: [Function: Decoder] },
     encoder: Encoder {},
     _adapter: [Function: Adapter],
     _origins: '*:*',
     sockets:
      Namespace {
        name: '/',
        server: [Circular],
        sockets: [Object],
        connected: [Object],
        fns: [],
        ids: 0,
        rooms: [],
        flags: {},
        adapter: [Object],
        _events: [Object],
        _eventsCount: 1 },
     eio:
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 },
     httpServer:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 5,
        _maxListeners: undefined,
        _connections: 0,
        _handle: [Object],
        _usingSlaves: false,
        _slaves: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3042',
        [Symbol(asyncId)]: 6 },
     engine:
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 } },
  adapter:
   Adapter {
     nsp:
      Namespace {
        name: '/',
        server: [Object],
        sockets: [Object],
        connected: [Object],
        fns: [],
        ids: 0,
        rooms: [],
        flags: {},
        adapter: [Circular],
        _events: [Object],
        _eventsCount: 1 },
     rooms: { HaJoMDiYVVGnDpxjAAAA: [Object] },
     sids: { HaJoMDiYVVGnDpxjAAAA: [Object] },
     encoder: Encoder {} },
  id: 'HaJoMDiYVVGnDpxjAAAA',
  client:
   Client {
     server:
      Server {
        nsps: [Object],
        _path: '/socket.io',
        _serveClient: true,
        parser: [Object],
        encoder: Encoder {},
        _adapter: [Function: Adapter],
        _origins: '*:*',
        sockets: [Object],
        eio: [Object],
        httpServer: [Object],
        engine: [Object] },
     conn:
      Socket {
        id: 'HaJoMDiYVVGnDpxjAAAA',
        server: [Object],
        upgrading: false,
        upgraded: false,
        readyState: 'open',
        writeBuffer: [],
        packetsFn: [],
        sentCallbackFn: [],
        cleanupFn: [Array],
        request: [Object],
        remoteAddress: '::1',
        checkIntervalTimer: null,
        upgradeTimeoutTimer: null,
        pingTimeoutTimer: [Object],
        transport: [Object],
        _events: [Object],
        _eventsCount: 3 },
     encoder: Encoder {},
     decoder: Decoder { reconstructor: null, _callbacks: [Object] },
     id: 'HaJoMDiYVVGnDpxjAAAA',
     request:
      IncomingMessage {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Array],
        trailers: {},
        rawTrailers: [],
        upgrade: true,
        url: '/socket.io/?EIO=3&transport=websocket',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: false,
        _dumped: false,
        parser: null,
        _query: [Object],
        websocket: [Object] },
     onclose: [Function: bound ],
     ondata: [Function: bound ],
     onerror: [Function: bound ],
     ondecoded: [Function: bound ],
     sockets: { HaJoMDiYVVGnDpxjAAAA: [Circular] },
     nsps: { '/': [Circular] },
     connectBuffer: [] },
  conn:
   Socket {
     id: 'HaJoMDiYVVGnDpxjAAAA',
     server:
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 },
     upgrading: false,
     upgraded: false,
     readyState: 'open',
     writeBuffer: [],
     packetsFn: [],
     sentCallbackFn: [],
     cleanupFn: [ [Function], [Function] ],
     request:
      IncomingMessage {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Array],
        trailers: {},
        rawTrailers: [],
        upgrade: true,
        url: '/socket.io/?EIO=3&transport=websocket',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: false,
        _dumped: false,
        parser: null,
        _query: [Object],
        websocket: [Object] },
     remoteAddress: '::1',
     checkIntervalTimer: null,
     upgradeTimeoutTimer: null,
     pingTimeoutTimer:
      Timeout {
        _called: false,
        _idleTimeout: 85000,
        _idlePrev: [Object],
        _idleNext: [Object],
        _idleStart: 3702,
        _onTimeout: [Function],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(asyncId)]: 18,
        [Symbol(triggerAsyncId)]: 0 },
     transport:
      WebSocket {
        readyState: 'open',
        discarded: false,
        socket: [Object],
        writable: false,
        perMessageDeflate: [Object],
        supportsBinary: true,
        _events: [Object],
        _eventsCount: 5,
        sid: 'HaJoMDiYVVGnDpxjAAAA',
        req: [Object] },
     _events:
      { close: [Array],
        data: [Function: bound ],
        error: [Function: bound ] },
     _eventsCount: 3 },
  rooms: {},
  acks: {},
  connected: true,
  disconnected: false,
  handshake:
   { headers:
      { host: 'localhost:3042',
        connection: 'Upgrade',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        upgrade: 'websocket',
        origin: 'http://amritb.github.io',
        'sec-websocket-version': '13',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'sec-websocket-key': 'UkNWfHoUnEwk+BhQLnbvXg==',
        'sec-websocket-extensions': 'permessage-deflate; client_max_window_bits' },
     time: 'Wed Jan 31 2018 08:20:58 GMT+0100 (CET)',
     address: '::1',
     xdomain: true,
     secure: false,
     issued: 1517383258590,
     url: '/socket.io/?EIO=3&transport=websocket',
     query: { EIO: '3', transport: 'websocket' } },
  fns: [],
  flags: {},
  _rooms: [] }


  Socket {
  nsp:
   Namespace {
     name: '/',
     server:
      Server {
        nsps: [Object],
        _path: '/socket.io',
        _serveClient: true,
        parser: [Object],
        encoder: Encoder {},
        _adapter: [Function: Adapter],
        _origins: '*:*',
        sockets: [Circular],
        eio: [Object],
        httpServer: [Object],
        engine: [Object] },
     sockets: { yquv20NFBqG_yVFfAAAA: [Circular] },
     connected: { yquv20NFBqG_yVFfAAAA: [Circular] },
     fns: [],
     ids: 0,
     rooms: [],
     flags: {},
     adapter:
      Adapter {
        nsp: [Circular],
        rooms: [Object],
        sids: [Object],
        encoder: Encoder {} },
     _events: { connection: [Function] },
     _eventsCount: 1 },
  server:
   Server {
     nsps: { '/': [Object] },
     _path: '/socket.io',
     _serveClient: true,
     parser:
      { protocol: 4,
        types: [Array],
        CONNECT: 0,
        DISCONNECT: 1,
        EVENT: 2,
        ACK: 3,
        ERROR: 4,
        BINARY_EVENT: 5,
        BINARY_ACK: 6,
        Encoder: [Function: Encoder],
        Decoder: [Function: Decoder] },
     encoder: Encoder {},
     _adapter: [Function: Adapter],
     _origins: '*:*',
     sockets:
      Namespace {
        name: '/',
        server: [Circular],
        sockets: [Object],
        connected: [Object],
        fns: [],
        ids: 0,
        rooms: [],
        flags: {},
        adapter: [Object],
        _events: [Object],
        _eventsCount: 1 },
     eio:
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 },
     httpServer:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 5,
        _maxListeners: undefined,
        _connections: 0,
        _handle: [Object],
        _usingSlaves: false,
        _slaves: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3042',
        [Symbol(asyncId)]: 6 },
     engine:
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 } },
  adapter:
   Adapter {
     nsp:
      Namespace {
        name: '/',
        server: [Object],
        sockets: [Object],
        connected: [Object],
        fns: [],
        ids: 0,
        rooms: [],
        flags: {},
        adapter: [Circular],
        _events: [Object],
        _eventsCount: 1 },
     rooms: { yquv20NFBqG_yVFfAAAA: [Object] },
     sids: { yquv20NFBqG_yVFfAAAA: [Object] },
     encoder: Encoder {} },
  id: 'yquv20NFBqG_yVFfAAAA',
  client:
   Client {
     server:
      Server {
        nsps: [Object],
        _path: '/socket.io',
        _serveClient: true,
        parser: [Object],
        encoder: Encoder {},
        _adapter: [Function: Adapter],
        _origins: '*:*',
        sockets: [Object],
        eio: [Object],
        httpServer: [Object],
        engine: [Object] },
     conn:
      Socket {
        id: 'yquv20NFBqG_yVFfAAAA',
        server: [Object],
        upgrading: false,
        upgraded: false,
        readyState: 'open',
        writeBuffer: [],
        packetsFn: [],
        sentCallbackFn: [],
        cleanupFn: [Array],
        request: [Object],
        remoteAddress: '::1',
        checkIntervalTimer: null,
        upgradeTimeoutTimer: null,
        pingTimeoutTimer: [Object],
        transport: [Object],
        _events: [Object],
        _eventsCount: 3 },
     encoder: Encoder {},
     decoder: Decoder { reconstructor: null, _callbacks: [Object] },
     id: 'yquv20NFBqG_yVFfAAAA',
     request:
      IncomingMessage {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Array],
        trailers: {},
        rawTrailers: [],
        upgrade: true,
        url: '/socket.io/?EIO=3&transport=websocket',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: false,
        _dumped: false,
        parser: null,
        _query: [Object],
        websocket: [Object] },
     onclose: [Function: bound ],
     ondata: [Function: bound ],
     onerror: [Function: bound ],
     ondecoded: [Function: bound ],
     sockets: { yquv20NFBqG_yVFfAAAA: [Circular] },
     nsps: { '/': [Circular] },
     connectBuffer: [] },
  conn:
   Socket {
     id: 'yquv20NFBqG_yVFfAAAA',
     server:
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 },
     upgrading: false,
     upgraded: false,
     readyState: 'open',
     writeBuffer: [],
     packetsFn: [],
     sentCallbackFn: [],
     cleanupFn: [ [Function], [Function] ],
     request:
      IncomingMessage {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Array],
        trailers: {},
        rawTrailers: [],
        upgrade: true,
        url: '/socket.io/?EIO=3&transport=websocket',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: false,
        _dumped: false,
        parser: null,
        _query: [Object],
        websocket: [Object] },
     remoteAddress: '::1',
     checkIntervalTimer: null,
     upgradeTimeoutTimer: null,
     pingTimeoutTimer:
      Timeout {
        _called: false,
        _idleTimeout: 85000,
        _idlePrev: [Object],
        _idleNext: [Object],
        _idleStart: 5734,
        _onTimeout: [Function],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(asyncId)]: 27,
        [Symbol(triggerAsyncId)]: 0 },
     transport:
      WebSocket {
        readyState: 'open',
        discarded: false,
        socket: [Object],
        writable: true,
        perMessageDeflate: [Object],
        supportsBinary: true,
        _events: [Object],
        _eventsCount: 5,
        sid: 'yquv20NFBqG_yVFfAAAA',
        req: [Object] },
     _events:
      { close: [Array],
        data: [Function: bound ],
        error: [Function: bound ] },
     _eventsCount: 3 },
  rooms: { yquv20NFBqG_yVFfAAAA: 'yquv20NFBqG_yVFfAAAA' },
  acks: {},
  connected: true,
  disconnected: false,
  handshake:
   { headers:
      { host: 'localhost:3042',
        connection: 'Upgrade',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        upgrade: 'websocket',
        origin: 'http://amritb.github.io',
        'sec-websocket-version': '13',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'sec-websocket-key': 'IqgN+mF2RDNBbjEpuGHJ+Q==',
        'sec-websocket-extensions': 'permessage-deflate; client_max_window_bits' },
     time: 'Wed Jan 31 2018 08:36:09 GMT+0100 (CET)',
     address: '::1',
     xdomain: true,
     secure: false,
     issued: 1517384169313,
     url: '/socket.io/?EIO=3&transport=websocket',
     query: { EIO: '3', transport: 'websocket' } },
  fns: [],
  flags: {},
  _rooms: [],
  _events: { store: [Function], auth: [Function], disconnect: [Function] },
  _eventsCount: 3 }


  */