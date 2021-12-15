import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.connected) {
    console.log('already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.connected = mongoose.connections[0].readyState;

    if (connection.connected === 1) {
      console.log('use prev connection');
      return;
    }

    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  });

  console.log('new connection');
  connection.connected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.connected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();

      connection.connected = false;
    } else {
      console.log('dev env, not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
