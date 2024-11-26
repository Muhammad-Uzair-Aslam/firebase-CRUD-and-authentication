import { Suspense } from "react";
import Data from "./(components)/data/data";
import Form from "./(components)/form/form";
import { auth } from "./firebaseConfig";
export default function Home() {
  console.log("verification",auth.config)
  return (
    <div className="min-h-screen p-10">
      <Form/>
      <Suspense fallback={<div className="text-center text-gray-500">Loading data...</div>}>
        <Data />
      </Suspense> 
    </div>
  );
}
