import { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { authContext } from "../contexts/authContext";

export default function AuthLayout() {
  const { isLoading } = useContext(authContext);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center items-center min-h-screen p-4 bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <div className="border rounded-2xl p-6 w-full max-w-xl bg-white/40">
        <Outlet />
      </div>
    </div>
  );
}
