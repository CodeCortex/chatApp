import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  // console.log("message sent",req.params.id);
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; //after middleware implement

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId, //can be short
      receiverId: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id); //know
    }


    // await conversation.save();
    // await newMessage.save();
    //run in parallel optimize
    await Promise.all([conversation.save(), newMessage.save()]);

    //Socket implementaion
    const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending messageController:  ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");  //Not reference but actual message          //to change messageid to messages

    if(!conversation){
      return res.status(200).json([]);
    }
    const messages= conversation.messages;
    res.status(200).json(messages);

  } catch (error) {
    console.log("Error in getMessages Controller:  ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
