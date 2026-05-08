export const getToken = () => {
  return localStorage.getItem("token");
}
//from localstorege we get userid + role 
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};