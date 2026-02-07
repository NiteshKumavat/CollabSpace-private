import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore"; // Import auth store to access socket

export const useMessageStore = create((set, get) => ({

    messages: [],
    projects: [],
    loading: false,
    error: null,
    // (Removed pagination complexity for now to ensure Socket works first)
    
    // ============================
    // Helpers
    // ============================
    startLoading: () => set({ loading: true, error: null }),
    stopLoading: () => set({ loading: false }),
    setError: (msg) => set({ error: msg }),

    getMyProjects: async () => {
        set({ loading: true });
        try {
            // 🛑 OLD/WRONG: 
            // const res = await axiosInstance.get("/api/project/my-projects");

            // ✅ NEW/CORRECT: (Matches your backend route)
            const res = await axiosInstance.get("/message/teams");
            
            set({ projects: res.data.data }); 
        } catch (err) {
            console.log(err);
            toast.error("Unable to load your teams");
        } finally {
            set({ loading: false });
        }
    },

    fetchMessages: async (projectId) => {
        set({ loading: true });
        try {
            // 🛑 OLD/WRONG: 
            // const res = await axiosInstance.get(`/messages/${projectId}`);

            // ✅ NEW/CORRECT: (Must match backend route '/teams/:teamId')
            const res = await axiosInstance.get(`/message/teams/${projectId}`);
            
            // Note: Your backend returns { data: [...] }, so we use res.data.data
            set({ messages: res.data.data }); 
        } catch (err) {
            console.log(err);
            // toast.error("Failed to load messages"); // Optional
        } finally {
            set({ loading: false });
        }
    },

    sendMessage: async ({ teamId, message, image }) => {
        const { messages } = get(); // Get current messages
        try {
            const updates = {teamId, message, image};
            // 1. Send to Backend
            const res = await axiosInstance.post(
                `/message`,
                updates,
                { withCredentials: true }
            );

            // 2. FORCE UPDATE THE UI IMMEDIATELY
            const newMessage = res.data.data;
            
            // Check if it's already there (to avoid duplicates from socket)
            const isDuplicate = messages.some(m => m._id === newMessage._id);
            
            if (!isDuplicate) {
                set({ messages: [...messages, newMessage] });
            }

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to send message");
        }
    },

    // ============================
    // SOCKET Live Updates
    // ============================
     subscribeToMessages: (projectId) => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        console.log("📡 Subscribing to Room:", projectId);
        
        // 1. Join the Room
        socket.emit("joinProject", projectId);

        // 2. Listen for New Messages
        socket.on("newMessage", (newMessage) => {
            console.log("⚡ Real-time message received:", newMessage);
            
            // 🐛 FIX: Check both 'teamId' and 'projectId' to be safe
            const messageRoomId = newMessage.teamId || newMessage.projectId;

            // Only add if it belongs to the currently open chat
            if (messageRoomId !== projectId) {
                console.log("⚠️ Message ignored (Wrong Room):", messageRoomId);
                return;
            }

            // Update State
            set({ messages: [...get().messages, newMessage] });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        
        console.log("🔕 Unsubscribing");
        socket.off("newMessage");
    },
}));    