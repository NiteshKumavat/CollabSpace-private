import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageStore = create((set, get) => ({

    messages: [],
    projects:[],
    loading: false,
    error: null,
    page: 1,
    limit: 20,
    hasMore: true,

    // ============================
    // Helpers
    // ============================
    startLoading: () => set({ loading: true, error: null }),
    stopLoading: () => set({ loading: false }),
    setError: (msg) => set({ error: msg }),


    getMyProjects: async () => {
        set({ loading: true });

        try {
            const res = await axiosInstance.get("/message/teams", {
                withCredentials: true,
            });

            set({ projects: res.data.data });

        } catch (err) {
            console.log(err);
            toast.error("Unable to load your teams");
        } finally {
            set({ loading: false });
        }
    },

    // ============================
    // Fetch Paginated Messages
    // ============================
    fetchMessages: async (teamId, reset = false) => {
        const { page, limit, startLoading, stopLoading, setError } = get();

        try {
            if (reset) {
                set({ messages: [], page: 1, hasMore: true });
            }

            startLoading();

            const currentPage = reset ? 1 : page;

            const res = await axiosInstance.get(
                `/message/teams/${teamId}?page=${currentPage}&limit=${limit}`,
                { withCredentials: true }
            );

            const newMessages = res.data.data || [];

            // Combine → Remove duplicates → Sort
            const merged = [...newMessages, ...get().messages]
                .filter((v, i, arr) => arr.findIndex(m => m._id === v._id) === i);

            set({
                messages: merged,
                page: currentPage + 1,
                hasMore: res.data.hasMore,
            });

        } catch (err) {
            const msg = err.response?.data?.message || "Failed to load messages";
            setError(msg);
            toast.error(msg);
        } finally {
            stopLoading();
        }
    },

    // ============================
    // Send Message
    // ============================
    sendMessage: async ({ teamId, message, image }) => {
        try {
            console.log("Sending message:", { teamId, message, image });
            const res = await axiosInstance.post(
                `/message`,
                { teamId, message, image },
                { withCredentials: true }
            );

            const newMsg = res.data.data;

            // Prevent duplicate entries
            if (get().messages.some(m => m._id === newMsg._id)) return;

            set({ messages: [...get().messages, newMsg] });

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send message");
        }
    },

    // ============================
    // Update Message
    // ============================
    updateMessage: async (messageId, newText) => {
        try {
            const res = await axiosInstance.put(
                `/message/${messageId}`,
                { message: newText },
                { withCredentials: true }
            );

            const updated = res.data.data;

            set({
                messages: get().messages.map((msg) =>
                    msg._id === messageId ? updated : msg
                ),
            });

            toast.success("Message updated");

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update message");
        }
    },

    // ============================
    // Delete Message
    // ============================
    deleteMessage: async (messageId) => {
        try {
            await axiosInstance.delete(`/message/${messageId}`, {
                withCredentials: true,
            });

            set({
                messages: get().messages.filter((msg) => msg._id !== messageId),
            });

            toast.success("Message deleted");

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete message");
        }
    },

    // ============================
    // SOCKET Live Updates (Future Ready)
    // ============================
    addIncomingMessage: (msg) => {
        if (!msg) return;

        // Avoid duplicates
        if (get().messages.some((m) => m._id === msg._id)) return;

        set({ messages: [...get().messages, msg] });
    },

}));
