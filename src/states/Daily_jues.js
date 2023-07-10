import create from 'zustand';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

export const useDailyJues = create((set) => ({
  // state
  dailyJues: [],

  // functions
  getDailyJues: async (year) => {
    const response = await fetch(`${baseURL}/daily_jues/?year=${year}`);
    const result = await response.json();

    set({ dailyJues: result });
  },

  createDailyJuess: async (data) => {
    const response = await fetch(`${baseURL}/daily_jues/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
}));
