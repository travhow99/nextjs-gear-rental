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

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();

  if (doc.user) doc.user = doc.user.toString();
  if (doc.user_id) doc.user_id = doc.user_id.toString();

  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
