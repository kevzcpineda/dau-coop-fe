const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
export const getUser = async (id) => {
  // return axios.get(`${baseURL}/userDetail/${id}`).then((res) => res.data);
  const response = await fetch(`${baseURL}/userDetail/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};
