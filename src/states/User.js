import create from 'zustand';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
const URL = 'https://web-production-94d8.up.railway.app';
export const useUser = create((set, get) => ({
  // states
  userId: null,
  user: {},
  users: [],
  token: localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null,
  // functions
  setUserId: (id) => {
    set({ userId: id });
  },

  getUsers: async (page) => {
    const response = await fetch(`${baseURL}/createUser/`);
    const result = await response.json();
    set({ users: await result });
  },

  getUser: async (id) => {
    const response = await fetch(`${baseURL}/userDetail/${id}/`);
    const result = await response.json();

    set({ user: await result });
  },

  editUser: async (id, payload) => {
    console.log(`id : ${id}`);
    console.log(`payload : ${payload}`);
    const response = await fetch(`${baseURL}/userDetail/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  },
  deleteUser: async (id) => {
    const response = await fetch(`${baseURL}/userDetail/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  deleteJeep: async (id) => {
    const response = await fetch(`${baseURL}/jeep/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  editJeep: async (id, payload) => {
    const response = await fetch(`${baseURL}/jeep/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
    return response;
  },

  createJeep: async (
    id,
    cr_fileNo,
    plate_no,
    engine_no,
    chasis_no,
    case_no,
    make,
    year_model,
    color,
    franchise_valid_date
  ) => {
    const response = await fetch(`${baseURL}/createJeep/?user_id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cr_fileNo: cr_fileNo,
        plate_no: plate_no,
        engine_no: engine_no,
        chasis_no: chasis_no,
        case_no: case_no,
        make: make,
        year_model: year_model,
        color: color,
        franchise_valid_date: franchise_valid_date,
      }),
    });
  },
}));
