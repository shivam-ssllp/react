export default function isLoggedInStatus() {
  if (window.localStorage.getItem("loginStatus")) {
    return true;
  }
  return false;
}
