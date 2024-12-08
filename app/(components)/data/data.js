import dataB from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import DeleteButton from "../deleteButton/deleteButton";
import Image from "next/image";
import UpdateButton from "../updateButton/updateButton";
import Modal from "../modal/modal";

const fetchUserData = async () => {
  const userData = collection(dataB, "newmessage");
  const userList = await getDocs(userData);
  const UserList = userList.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(UserList);
  return UserList;
};

export default async function Data() {
  const userDataList = await fetchUserData();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Modal />
      <h1 className="text-center text-4xl font-extrabold text-blue-600 my-10">
        User Data Table
      </h1>
      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                Profile Picture
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Message</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {userDataList.map((list, i) => (
              <tr
                key={list.id}
                className={`hover:bg-gray-100 transition duration-200 ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{list.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <Image 
                      className="rounded-full object-cover"
                      src={list.dataset}
                      width={50}
                      height={50}
                      alt="Profile Picture"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-bold">{list.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                    {list.email}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{list.message}</td>
                <td className="px-6 py-4 flex gap-2 flex-row justify-self-center">
                  <UpdateButton defaultValue={list} />
                  <DeleteButton id={list.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
