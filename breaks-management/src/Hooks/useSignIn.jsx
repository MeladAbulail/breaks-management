const useSignIn = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  return isAdmin;
};

export default useSignIn;
