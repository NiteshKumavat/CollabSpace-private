import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client"; // Import socket.io

const BASE_URL = "http://localhost:3000"; // Make sure this matches your backend port

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null, 
    onlineUsers: [], 
    token: null,


    googleAuthentication: async (credentialResponse) => {
        set({ authUser: null });
        set({ isLoggingIn: true });
        try {
            const token = credentialResponse.credential;
            console.log("Google Credential Token:", token);
            const res = await axiosInstance.post("/auth/google", {token});
            set({ authUser: res.data });
            toast.success("Login successful 🚀");
            get().connectSocket(); 
        } catch (error) {
            console.log("Error : ", error.response?.data?.message)
            set({ authUser: null });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket(); // Connect socket on auto-login
        } catch (error) {
            console.log("Error : ", error.response?.data?.message)
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    getToken : async () => {
        try {
            const res = await axiosInstance.get("/auth/streamToken");
            set({ token: res.data.streamToken });
            
            return res.data.streamToken;
        } catch (error) {
            console.log("Error generating Stream token:", error);
            toast.error("Could not generate Stream token");
        }
    },



    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Account created successfully 🎉");
            get().connectSocket(); // Connect socket on signup
        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ authUser: null });
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successful 🚀");
            get().connectSocket(); // Connect socket on login
        } catch (error) {

            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            get().disconnectSocket(); // Disconnect socket on logout
            toast.success("Logged out 👋");
        } catch (error) {
            console.log("Logout error:", error);
            toast.error("Logout failed");
        }
    },

    deleteUser: async () => {
        try {
            await axiosInstance.delete("/auth/deleteUser", { withCredentials: true });
            set({ authUser: null });
            get().disconnectSocket();
            toast.success("User deleted successfully 👋");
        } catch (error) {
            console.log("Delete User error:", error);
            toast.error("Delete User failed");
        }
    },

    generateToken: async () => {
        try {
            const res = await axiosInstance.get("/auth/streamToken");
            return res.data.token;
        } catch (error) {
            console.log("Error generating Stream token:", error);
            toast.error("Could not generate Stream token");
            return null;
        }
    },

    // --- SOCKET LOGIC ---
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });

        socket.connect();
        set({ socket: socket });

        // Listen for online users updates
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
            set({ socket: null });
        }
    },

}));