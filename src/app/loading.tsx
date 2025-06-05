"use client";
import { ClipLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader
        color="#36d7b7"
        cssOverride={{ display: "block", margin: "100px auto" }}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingPage;
