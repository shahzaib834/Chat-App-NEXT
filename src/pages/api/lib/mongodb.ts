import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://shahzaib:shahzaib@cluster0.mrlsmau.mongodb.net/?retryWrites=true&w=majority';

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
//}

export default clientPromise