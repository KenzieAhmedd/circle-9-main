import { Spinner } from "@heroui/react";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner color="secondary" />
    </div>
  );
}
