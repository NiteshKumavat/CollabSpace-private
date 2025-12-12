import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error : ", error.response?.data?.message)
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Account created successfully 🎉");
        } catch (error) {
            console.log("Signup error:", error);
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
        } catch (error) {
            console.log("Login error:", error);
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
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
            toast.success("User deleted successfully 👋");
        } catch (error) {
            console.log("Delete User error:", error);
            toast.error("Delete User failed");
        }
    },

}));
