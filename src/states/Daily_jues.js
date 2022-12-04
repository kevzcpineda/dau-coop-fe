import create from 'zustand';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

const useDailyJues = create((set) => ({
  // state
  dailyJues: [],

  // functions
  getDailyJues: async (year) => {
    const response = await fetch(`${baseURL}/daily_jues/?year=${year}`);
    const result = await response.json();

    set({ dailyJues: result });
  },

  createDailyJues: async () => {
    const response = await fetch(`${baseURL}/daily_jues/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: username, amount: password }),
    });
  },
}));
