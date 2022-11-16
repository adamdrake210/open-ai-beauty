import { Loader } from "@/components/common/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Loader loadingText="Loading..." />
    </div>
  );
};

export default loading;
