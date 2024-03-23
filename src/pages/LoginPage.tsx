import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
const LoginPage = () => {
  const navegate = useNavigate();

  const redirectToDashboard = () => {
    return navegate("/dashboard");
  };
  return (
    <>
      <main className='flex flex-col h-screen justify-center min-h-screen py-12 space-y-4 w-full items-center lg:space-y-0 lg:flex-row lg:py-24'>
        <Login redirectToDashboard={redirectToDashboard} />
      </main>
    </>
  );
};

export default LoginPage;
