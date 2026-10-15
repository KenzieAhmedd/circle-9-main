import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";
import { HeroUIProvider } from "@heroui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
import AuthContextProvider from "./contexts/authContext";
import CounterContextProvider from "./contexts/counterContext";

const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: (
          <ProtectedAuthRoute>
            <SignUp />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "signin",
        element: (
          <ProtectedAuthRoute>
            <SignIn />
          </ProtectedAuthRoute>
        ),
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:postId",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CounterContextProvider>
          <HeroUIProvider>
            <RouterProvider router={router} />
          </HeroUIProvider>
        </CounterContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;