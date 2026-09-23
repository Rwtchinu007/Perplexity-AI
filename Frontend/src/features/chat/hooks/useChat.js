import { initializeSocketConnection } from "../service/chat.socket";

import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";

import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
  addStreamingMessage,
  appendMessageChunk,
} from "../chat.slice";

import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export const useChat = () => {
  const dispatch = useDispatch();

  // Socket ko poore hook mein accessible rakhne ke liye
  const socketRef = useRef(null);

  // ---------------------------------------
  // Initialize Socket + Listen for events
  // ---------------------------------------

  useEffect(() => {
    const socket = initializeSocketConnection();

    socketRef.current = socket;

    // ---------------------------------------
    // Receive AI streaming chunks
    // ---------------------------------------

    socket.on("ai-chunk", ({ chatId, chunk }) => {
      dispatch(
        appendMessageChunk({
          chatId,
          chunk,
        }),
      );
    });

    // ---------------------------------------
    // AI response complete
    // ---------------------------------------

    socket.on("ai-complete", ({ chatId }) => {
      dispatch(setLoading(false));

      console.log("AI streaming completed:", chatId);
    });

    // ---------------------------------------
    // AI streaming error
    // ---------------------------------------

    socket.on("ai-error", ({ chatId, message }) => {
      console.error("AI streaming error:", message);

      dispatch(setError(message));
      dispatch(setLoading(false));
    });

    // ---------------------------------------
    // Cleanup listeners
    // ---------------------------------------

    return () => {
      socket.off("ai-chunk");
      socket.off("ai-complete");
      socket.off("ai-error");
    };
  }, [dispatch]);

  // ---------------------------------------
  // Send Message
  // ---------------------------------------

  async function handleSendMessage({ message, chatId }) {
    try {
      dispatch(setLoading(true));

      // Current socket
      const socket = socketRef.current;

      // Make sure socket exists
      if (!socket) {
        throw new Error("Socket connection is not initialized");
      }

      // Make sure socket is connected
      if (!socket.connected) {
        throw new Error("Socket is not connected");
      }

      // ---------------------------------------
      // Send message to backend
      // ---------------------------------------

      const data = await sendMessage({
        message,
        chatId,
        socketId: socket.id,
      });

      const { chat } = data;

      // Existing chat OR newly created chat
      const currentChatId = chatId || chat._id;

      // ---------------------------------------
      // Create new chat in Redux
      // ---------------------------------------

      if (!chatId) {
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      }

      // ---------------------------------------
      // Add user's message
      // ---------------------------------------

      dispatch(
        addNewMessage({
          chatId: currentChatId,
          content: message,
          role: "user",
        }),
      );

      // ---------------------------------------
      // Create empty AI message
      // ---------------------------------------

      dispatch(
        addStreamingMessage({
          chatId: currentChatId,
        }),
      );

      // ---------------------------------------
      // Set current chat
      // ---------------------------------------

      dispatch(setCurrentChatId(currentChatId));
    } catch (error) {
      console.error("Error sending message:", error);

      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  }

  // ---------------------------------------
  // Get all chats
  // ---------------------------------------

  async function handleGetChats() {
    try {
      dispatch(setLoading(true));

      const data = await getChats();
      const { chats } = data;

      dispatch(
        setChats(
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              messages: [],
              lastUpdated: chat.updatedAt,
            };

            return acc;
          }, {}),
        ),
      );

      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching chats:", error);

      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  }

  // ---------------------------------------
  // Open Chat
  // ---------------------------------------

  async function handleOpenChat(chatId, chats) {
    try {
      if (chats[chatId]?.messages.length === 0) {
        const data = await getMessages(chatId);
        const { messages } = data;

        const formattedMessages = messages.map((msg) => ({
          content: msg.content,
          role: msg.role,
        }));

        dispatch(
          addMessages({
            chatId,
            messages: formattedMessages,
          }),
        );
      }

      dispatch(setCurrentChatId(chatId));
    } catch (error) {
      console.error("Error opening chat:", error);

      dispatch(setError(error.message));
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
  };
};
