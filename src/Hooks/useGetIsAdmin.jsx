const useGetIsAdmin = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"))?.isAdmin;

  return isAdmin || false;
};

export default useGetIsAdmin;
