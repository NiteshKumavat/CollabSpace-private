import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useProjectStore = create((set, get) => ({
  projects: [],
  userProjects: [],
  loading: false,
  error: null,


  fetchAllProjects: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.get("/project");
      set({ projects: res.data.filteredProjects });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch projects" });
    } finally {
      set({ loading: false });
    }
  },


  fetchUserProjects: async (userId) => {
    try {
      
      set({ loading: true });
      const res = await axiosInstance.get(`/project/${userId}/projects`);
      set({ userProjects: res.data.projects });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch user projects" });
    } finally {
      set({ loading: false });
    }
  },


  createProject: async (projectData) => {
    try {
      const res = await axiosInstance.post("/project", projectData);
      set({ projects: [res.data.project, ...get().projects] });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },


  updateProject: async (projectId, updates) => {
    try {
      const res = await axiosInstance.put(`/project/${projectId}`, updates);

      set({
        projects: get().projects.map((proj) =>
          proj._id === projectId ? res.data.project : proj
        )
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },


  deleteProject: async (projectId) => {
    try {
      await axiosInstance.delete(`/api/project/${projectId}`);

      set({
        projects: get().projects.filter((proj) => proj._id !== projectId),
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  requestToJoin: async (projectId) => {
    try {
      const res = await axiosInstance.put(`/project/${projectId}/request`);
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },


  acceptRequest: async (projectId, userId) => {
    try {
      const res = await axiosInstance.put(`/project/${projectId}/request/${userId}/accept`);
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },


  rejectRequest: async (projectId, userId) => {
    try {
      const res = await axiosInstance.put(`/project/${projectId}/request/${userId}/reject`);
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  }

}));

