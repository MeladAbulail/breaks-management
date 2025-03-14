const useSignOut = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  return isAdmin;
};

export default useSignOut;
