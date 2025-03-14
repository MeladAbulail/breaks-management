const useGetIsAdmin = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  return isAdmin;
};

export default useGetIsAdmin;
