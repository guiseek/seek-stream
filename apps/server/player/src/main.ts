import { DB, DBPlaylist, DBSession } from './db.interfaces';
import * as fs from 'fs';
import * as sv from 'socket.io';
import { ClientService } from './app/client.service';

const YOUR_HOST = 'http://localhost:4200';

const io = sv.listen(8888);

io.origins((origin, callback) => {
  if (origin !== YOUR_HOST) {
    return callback('origin not allowed', false);
  }
  callback(null, true);
});

const make = {
  guid: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4();
  },
};

class Session implements DBSession {
  constructor(public data) {
    this.data = data;
  }
  playlist: DBPlaylist[];
  player: any[];

  exists(name) {
    return this.data.indexOf(name) === -1 ? false : true;
  }

  create() {
    const guid = make.guid();
    const clearSession = {};
    clearSession[guid] = { playlist: [], player: [] };
    this.data.push(clearSession);
    return guid;
  }
}

class Database implements DB {
  constructor(public name) {
    this.name = name;

    this.data = {
      sessions: [],
    };

    if (fs.existsSync(name)) {
      const data = JSON.parse(fs.readFileSync(this.name).toString());
      for (const i in this.data) {
        if (typeof data[i] === 'undefined') {
          data[i] = this.data[i];
        }
      }
      this.data = data;
    } else {
      this.writeDB();
    }

    this.session = new Session(this.data.sessions);

    return this;
  }
  sessions: { [key: string]: DBSession }[];
  data;
  session;

  writeDB() {
    fs.writeFileSync(this.name, JSON.stringify(this.data));
  }

  update(sessionKey, row, data) {
    const sessionOBJ = this.data.sessions.find(
      (findSession) => findSession[sessionKey]
    )[sessionKey];
    sessionOBJ[row] = data;
    this.writeDB();
  }
}

const db = new Database('./db.json');

class Client {
  clients = [];
  constructor() {
    this.clients = [];
  }

  processData(data) {
    this.clients.push(data);
  }

  getAllClients() {
    return this.clients;
  }

  existClient(clientID) {
    const client = this.clients.filter((c) => c.id === clientID);
    return client;
  }

  existClientName(clientName) {
    const client = this.clients.filter((c) => c.name === clientName);
    return client;
  }

  removeClient(clientID) {
    const foundClient = this.clients.find((client) => client.id === clientID);
    const index = this.clients.indexOf(foundClient);
    this.clients.splice(index, 1);
  }

  updateClient({ id: clientID, updateData: newData }) {
    const clientIndex = this.clients.findIndex(
      (client) => client.id === clientID
    );
    this.clients[clientIndex].room = newData.room;
  }

  getClientsFromRoom(roomID) {
    // console.log(roomID);
    // console.log(this.clients.filter(client => client.room = roomID));
    const client = this.clients.filter((c) => c.room === roomID);
    return client;
  }
}

// const newClient = new Client();
const newClient = new ClientService();

io.on('connection', function (socket) {
  const clientData = {
    id: '',
    name: '',
    room: '',
  };

  socket.on('disconnect', () => {
    if (clientData.id !== '') {
      socket.leave(clientData.room);
      newClient.removeClient(clientData.id);
      io.to(clientData.room).emit('user_left', {
        name: clientData.name,
        clients: newClient.getClientsFromRoom(clientData.room),
      });
    }
  });

  socket.on('join_session', ({ session, name }, callback) => {
    clientData.name = name;
    clientData.room = session;
    clientData.id = socket.id;
    let statusData = 'USERNAME_OK';
    const IS_CLIENTNAME_EXIST = newClient.existClientName(clientData.name);
      // newClient.existClientName(clientData.name).length > 0;

    if (IS_CLIENTNAME_EXIST) {
      clientData.name = clientData.id;
      statusData = 'USERNAME_EXIST';
    } else if (clientData.name === '' || clientData.name == null) {
      clientData.name = clientData.id;
      statusData = 'USERNAME_EMPTY';
    } else {
      clientData.name = name;
    }

    socket.join(clientData.room);
    newClient.processData(clientData);
    io.to(clientData.room).emit('user_joined', {
      name: clientData.name,
      clients: newClient.getClientsFromRoom(clientData.room),
    });

    callback({
      client: clientData,
      status: statusData,
    });
  });

  socket.on('leave_session', (roomName) => {
    socket.leave(roomName);
    newClient.removeClient(clientData.id);
    io.to(roomName).emit('user_left', {
      name: clientData.name,
      clients: newClient.getClientsFromRoom(roomName),
    });
  });

  socket.on('change_username', ({ name }) => {
    console.log(clientData);
    // const IS_CLIENTNAME_NOT_EXIST = newClient.existClientName(name).length < 1;
    const IS_CLIENTNAME_NOT_EXIST = !newClient.existClientName(name);
    if (IS_CLIENTNAME_NOT_EXIST && name !== '') {
      clientData.name = name;
      newClient.updateClient({
        id: clientData.id,
        updateData: clientData,
      });
      io.to(clientData.room).emit('username_changed', {
        name: clientData.name,
        clients: newClient.getClientsFromRoom(clientData.room),
      });
    }
  });

  // socket.emit('get_session', '') - create new session
  // socket.emit('get_session, {session: 'HASH'}) - get session key
  socket.on('get_session', (data, callback) => {
    try {
      let status, session;
      if (typeof data.session !== 'undefined') {
        const availableSession = db.session.data.find(
          (findSession) => findSession[data.session]
        );
        if (availableSession) {
          session = availableSession;
          status = 'SESSION_OK';
        } else {
          session = data.session;
          status = 'SESSION_NOT_FOUND';
        }
      } else {
        session = db.session.create();
        db.writeDB();
        status = 'SESSION_NEW';
      }

      callback({
        session: session,
        status: status,
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('update_session', ({ session, row, data }, callback) => {
    try {
      let status;
      const availableSession = db.session.data.find(
        (findSession) => findSession[session]
      );
      if (availableSession) {
        db.update(session, row, data);
        status = 'SESSION_UPDATED';
      } else {
        status = 'SESSION_NOT_UPDATED';
      }

      callback({
        session: session,
        status: status,
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('update_player', (data) => {
    io.to(data.roomName).emit('event_trigger', data);
  });

  socket.on('update_playlist', (roomName) => {
    const availableSession = db.session.data.find(
      (findSession) => findSession[roomName]
    );
    if (availableSession) {
      io.to(roomName).emit('download_playlist', availableSession);
    }
    io.to(roomName).emit('alert_msg', `I want to update ${roomName}`);
  });
});
