import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import { authContext } from "../contexts/authContext";

export default function MainLayout() {
  const { isLoading } = useContext(authContext);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
