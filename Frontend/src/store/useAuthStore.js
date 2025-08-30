import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/" 

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check', { withCredentials: true });
      set({ authUser: res.data, isCheckingAuth: false });
      get().connectSocket();
    } catch (error) {
      console.log('Error in checkAuth', error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/signup', data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success('Account created successfully');
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/login', data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success('Logged in successfully');
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
      set({ authUser: null });
      toast.success('Logged out successfully');
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || (socket && socket.connected)) return;

    const newSocket = io( BASE_URL, {
      query: { userId: authUser._id },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
