import create from 'zustand';
import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

export const useLoan = create((set, get) => ({
  // state
  loans: [],
  users: [],
  userLoan: {},
  //computed
  computed: {
    get isloans() {
      return get().loans;
    },
  },
  // functions
  getLoans: async () => {
    const response = await axios.get(`${baseURL}/loan/`);
    set({ loans: response.data });
  },

  createLoan: async () => {
    const response = await fetch(`${baseURL}/loan/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loan: username, amount: password }),
    });
  },

  getUserLoan: async () => {
    const response = await fetch(`${baseURL}/loan/user_loan/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authTokens?.access}`,
      },
    });
    const result = await response.json();

    set({ userLoan: result });
  },

  loanPayment: async (id, amount) => {
    const response = await fetch(`${baseURL}/loan/payments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loan: id, amount: amount }),
    });
  },
}));
