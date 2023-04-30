const Chat = require('../models/chatModel');
import { User } from '../models/userModel'; 
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

export const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getUser: async (_, { id }) => await User.findById(id),
    getChat: async (_, { id }) => await Chat.findById(id).populate('users'),
  },
  Mutation: {
    signUp: async (_, args) => {
      const { email, password, name, picture } = args.input;
      const userExists = await User.findOne({ email });

      if (userExists) return { error: 'User Already Exists!' };
      const user = await User.create({
        name: name,
        email: email,
        password: password,
        picture: picture,
      });

      if (!user) return { error: 'Something Went wrong' };

      return {
        token: generateToken(user._id),
        user,
      };
    },
    signIn: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) return { error: 'User Not Found' };

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return { error: 'Email or Password Incorrect' };

      return {
        token: generateToken(user._id),
        user: {
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
      };
    },
    accessChat: async (_, args, context, info) => {
      const { isGroupChat, chatName, ids, latestMessage, groupAdmin } = args.input;
      if (ids.length === 1) {
        // access single chat.
        const isChat = await Chat.find({
          isGroupChat: false,
          $and: [
            { users: { $elemMatch: { $eq: context.user.id } } },
            { users: { $elemMatch: { $eq: ids[0] } } },
          ],
        }).populate('users');

        if (isChat.length > 0) {
          return isChat[0];
        }
        const users = await User.find({
          _id: { $in: [ids[0], context.user.id] },
        });
        const chat = new Chat({
          isGroupChat,
          chatName,
          users,
          latestMessage,
          groupAdmin,
        });
        return chat.save();
      }

      return null;
    },
    fetchChats: async (_, args, contextValue) => {
      return await Chat.find({ users: { $elemMatch: {$eq: contextValue.user.id}}}).populate('users').populate("latestMessage").sort({ updatedAt: -1});
    },
    createGroupChat: async(_, args, context) => {
       const { usersEmails, chatName } = args;

       if (!usersEmails) return { error: 'Please Fill all fields' };
       if (usersEmails.length < 2) return console.log('More than two users required to create group chat');

      const loggedInUser = await User.findById(context.user.id);
      usersEmails.push(loggedInUser.email);

      const users = await User.find({
        email: {$in : usersEmails}
      });

      try {
        const groupChat = await Chat.create({
          chatName,
          users,
          isGroupChat: true,
          groupAdmin: loggedInUser._id,
        });
         
        const fullGroupChat = await Chat.findById({ _id: groupChat._id}).populate("users").populate("groupAdmin");
        return fullGroupChat;
      } catch(err) {
        console.log(err);
        return { error: 'Something went wrong' };
      }
    },
    renameGroup: async(_, args, context) => {
      const { chatId, chatName } = args;
      const updatedChat = await Chat.findOneAndUpdate(chatId, {
        chatName
      }, {new: true}).populate("users").populate("groupAdmin");
  
      if(!updatedChat) throw new Error("Chat not found");
  
      return updatedChat;
    },
    addToGroup: async(_, args, context) => {
      const {chatId , userId } = args;
      const added = await Chat.findOneAndUpdate(chatId, {
        $push: { users: userId }
      }, {new: true}).populate("users");

      if(!added) throw new Error("User not found");

      return added;
    },
    removeFromGroup: async(_, args, context) => {
      const {chatId , userId } = args;
      const removed = await Chat.findOneAndUpdate(chatId, {
        $pull: { users: userId }
      }, {new: true}).populate("users");

      if(!removed) throw new Error("User not found");

      return removed;
    }
  }
};