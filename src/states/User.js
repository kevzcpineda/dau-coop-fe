import create from 'zustand';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
const URL = 'https://web-production-94d8.up.railway.app';
export const useUser = create((set) => ({
  // states
  user: {},
  // token: localStorage.getItem()
  // functions
  test: (id) => {
    console.log(`${URL}/kevin${id}`);
  },

  getUser: async (id) => {
    const response = await fetch(`${URL}/userDetail/${id}/`);
    const result = await response.json();

    set(() => ({ user: result }));
  },
  editUser: async (id, fname, lname) => {
    const response = await fetch(`${baseURL}/userDetail/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: fname,
        last_name: lname,
        member_status: 'driver',
      }),
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

  editJeep: async (id) => {
    const response = await fetch(`${baseURL}/jeep/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });
  },

  createJeep: async (id) => {
    const response = await fetch(`${baseURL}/createJeep/?user_id=${id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });
  },
}));
