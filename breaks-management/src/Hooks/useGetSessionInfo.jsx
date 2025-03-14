const useGetSessionInfo = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token;
};

export default useGetSessionInfo;
