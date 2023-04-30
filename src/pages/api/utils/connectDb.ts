const mongoose = require('mongoose');

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://shahzaib:shahzaib@cluster0.mrlsmau.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'chat-app',
    });

    console.log(`mongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(0);
  }
};
