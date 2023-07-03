import create from 'zustand';
import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

export const useLoan = create((set, get) => ({
  // state
  loans: [],
  users: [],
  userLoan: {},
  token: localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null,
  //computed
  computed: {
    get isloans() {
      return get().loans;
    },
    get getLoan() {
      return get().userLoan;
    },
  },
  // functions

  getLoans: async () => {
    const response = await axios.get(`${baseURL}/loan/`);
    set({ loans: response.data });
  },

  createLoan: async (id, amount, voucher, promissory, check) => {
    const response = await fetch(`${baseURL}/loan/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: id,
        loan: amount,
        voucher_number: voucher,
        promissory_note_number: promissory,
        check_number: check,
      }),
    });
  },

  getUserLoan: async (t) => {
    const response = await fetch(`${baseURL}/loan/user_loan`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${t.access}`,
      },
    });
    const result = await response.json();
    // console.log(result);
    set({ userLoan: result });
  },

  loanPayment: async (payload) => {
    const response = await fetch(`${baseURL}/loan/payments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  },
}));
