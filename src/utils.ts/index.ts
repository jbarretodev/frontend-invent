import dayjs from "dayjs";

export const checkLoginUser = () => {
  const user = localStorage.getItem("user");
  const expireAt = localStorage.getItem("expireAt");
  const token = localStorage.getItem("token");

  if (!user || !expireAt || !token) return false;

  if (!dayjs().isBefore(expireAt)) return false;

  return true;
};
