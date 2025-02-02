import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";

const LoginPage = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <Login redirectToDashboard={redirectToDashboard} />
    </main>
  );
};

export default LoginPage;
