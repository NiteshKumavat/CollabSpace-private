import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProfileStore = create((set) => ({
    allusers: [],
    profile: null,
    newProfile: null,
    requests: null,
    loading: false,
    error: null,


    getUsers: async () => {
        try {
            set({ loading: true });

            const res = await axiosInstance.get(`/profile/users`, { withCredentials: true });
            set({ allusers: res.data.profiles, loading: false });


        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch profile";
            toast.error(message);
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },


    fetchProfile: async (Id) => {
        try {
            console.log("Fetching profile for ID:", Id);
            set({ loading: true });

            const res = await axiosInstance.get(`/profile/${Id}`, { withCredentials: true });
            console.log(res.data);

            set({
                profile: res.data.profile,
                requests: res.data.Request || null,
                error: null,
            });

        } catch (err) {
            const message = err.response?.data?.message || "Failed to fetch profile";
            toast.error(message);
            set({ error: message });

        } finally {
            set({ loading: false });
        }
    },


    updateProfile: async (updates) => {
        try {

            console.log("Updating profile with data:", updates);
            set({ loading: true });

            const res = await axiosInstance.put(`/profile/update`, updates, {
                withCredentials: true,
            });


            set({
                profile: res.data,
                error: null,
            });

            toast.success("Profile updated successfully!");

        } catch (err) {
            const message = err.response?.data?.message || "Failed to update profile";
            toast.error(message);
            set({ error: message });

        } finally {
            set({ loading: false });
        }
    },


    blockUser: async (userId) => {
        try {
            await axiosInstance.put(`/profile/block/${userId}`, {}, { withCredentials: true });

            set((state) => ({
                profile: {
                    ...state.profile,
                    blockList: [...(state.profile?.blockList || []), userId],
                },
            }));

            toast.success("User blocked successfully");

        } catch (err) {
            const message = err.response?.data?.message || "Error blocking user";
            toast.error(message);
            set({ error: message });
        }
    },


    unblockUser: async (userId) => {
        try {
            await axiosInstance.put(`/profile/unblock/${userId}`, {}, { withCredentials: true });

            set((state) => ({
                profile: {
                    ...state.profile,
                    blockList: state.profile?.blockList.filter((id) => id !== userId),
                },
            }));

            toast.success("User unblocked successfully");

        } catch (err) {
            const message = err.response?.data?.message || "Error unblocking user";
            toast.error(message);
            set({ error: message });
        }
    },


    toggleAvailability: async (available) => {
        try {
            const res = await axiosInstance.put(
                `/profile/availability`,
                { available },
                { withCredentials: true }
            );

            set((state) => ({
                profile: { ...state.profile, isAvailableForCollab: res.data.isAvailableForCollab },
            }));

            toast.success(available ? "You are now available!" : "Availability turned off");

        } catch (err) {
            const message = err.response?.data?.message || "Error updating availability";
            toast.error(message);
            set({ error: message });
        }
    },

    /** -------- Delete Profile -------- */
    deleteProfile: async () => {
        try {
            await axiosInstance.delete(
                `/profile/delete`,
                { withCredentials: true }
            );
            set({ profile: null, requests: null });

            toast.success("Profile deleted successfully");
        } catch (err) {
            const message = err.response?.data?.message || "Error deleting profile";
            toast.error(message);
            set({ error: message });
        }
    },

    /** -------- Clear errors if needed -------- */
    clearError: () => set({ error: null }),
}));
