import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  _messageHandler: null, // socket listener reference

  // Fetch users
  getUsers: async () => {
    try {
      const res = await axiosInstance.get('/messages/users');
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  // Fetch messages for selected user
  getMessages: async (userId) => {
    set({ messages: [] }); // clear previous messages
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    }
  },

  // Send message via backend and socket
  sendMessage: async (text) => {
    const { selectedUser, messages } = get();
    const { socket, authUser } = useAuthStore.getState();

    if (!selectedUser || !authUser || !socket) return;

    // Emit via socket
    socket.emit('sendMessage', {
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text,
    });

    // Save via backend for persistence
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        { text },
        { withCredentials: true }
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  },

  // Handle incoming messages
  handleIncomingMessage: (newMessage) => {
    const { selectedUser, messages, unreadCounts } = get();

    if (
      newMessage.senderId === selectedUser?._id ||
      newMessage.receiverId === selectedUser?._id
    ) {
      // Add to messages if for current chat
      set({ messages: [...messages, newMessage] });
    } else {
      // Increment unread count for other users
      set({
        unreadCounts: {
          ...unreadCounts,
          [newMessage.senderId]: (unreadCounts[newMessage.senderId] || 0) + 1
        }
      });
    }
  },

  // Subscribe to incoming messages safely
  subscribeToMessages: () => {
    const { socket } = useAuthStore.getState();

    if (!socket) {
      setTimeout(() => get().subscribeToMessages(), 100);
      return;
    }

    // Remove previous listener
    const { _messageHandler } = get();
    if (_messageHandler) socket.off('newMessage', _messageHandler);

    const handleNewMessage = (newMessage) => {
      get().handleIncomingMessage(newMessage);
    };

    socket.on('newMessage', handleNewMessage);
    set({ _messageHandler: handleNewMessage });
  },

  // Unsubscribe from messages
  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    const { _messageHandler } = get();
    if (socket && _messageHandler) {
      socket.off('newMessage', _messageHandler);
      set({ _messageHandler: null });
    }
  },


  setSelectedUser: (user) => {

    set({ 
      selectedUser: user,
    });
  },
}));
