
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useAuth = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      error: null,
      isAuthenticated: false,
      isHydrated: false,

      // LOGIN
      login: async (userCredObj) => {
        try {
          set({ loading: true, error: null });

          const res = await axios.post(
            `${BASE_URL}/common-api/authenticate`,
            userCredObj,
            { withCredentials: true }
          );

          set({
            loading: false,
            isAuthenticated: true,
            currentUser: res.data.payload,
          });
        } catch (err) {
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: err.response?.data?.message || "Login failed",
          });
        }
      },

      // LOGOUT
      logout: async () => {
        await axios.get(`${BASE_URL}/common-api/logout`, {
          withCredentials: true,
        });

        set({
          currentUser: null,
          isAuthenticated: false,
        });

        localStorage.removeItem("user-auth-storage");
      },

      // CHECK AUTH
      checkAuth: async () => {
        try {
          const res = await axios.get(
            `${BASE_URL}/common-api/check-auth`,
            { withCredentials: true }
          );

          set({
            isAuthenticated: true,
            currentUser: res.data.payload,
          });
        } catch {
          set({
            isAuthenticated: false,
            currentUser: null,
          });
        }
      },
    }),
    {
      name: "user-auth-storage",

      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),

      // ✅ CORRECT HYDRATION FIX
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          setTimeout(() => {
            useAuth.setState({ isHydrated: true });
          }, 0);
        }
      },
    }
  )
);
