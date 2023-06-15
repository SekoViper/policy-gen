import React from "react";
import PolicyForm from "../components/policy-form";
import { useRouter } from "next/router";

const Policies = () => {
  const { id } = useRouter().query;
  const removeExtension = id.replace(".hbs", "");
  const removeHyphen = removeExtension.replace(/-/g, " ");
  const words = removeHyphen.split(" ");
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  const fileName = capitalizedWords.join(" ");

  return (
    <div className="container mt-12 mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4 text-center ">Generate {fileName}</h1>
      <PolicyForm />
    </div>
  );
};

export default Policies;
