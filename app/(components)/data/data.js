
import dataB from '@/app/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import DeleteButton from '../deleteButton/deleteButton';
import Image from 'next/image';
import UpdateButton from '../updateButton/updateButton';
import Modal from '../modal/modal';
const fetchUserData = async () => {
  const userData = collection(dataB, 'newmessage');
  const userList = await getDocs(userData);
  const UserList=userList.docs.map((doc)=>({id:doc.id,...doc.data()}));
  console.log(UserList)
  return UserList
};

export default async function Data() {
  const userDataList = await fetchUserData();
  return (
    <div>
      <Modal/>
      <h1 className="text-blue-500 my-10 text-5xl font-bold">Data of Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Profile Picture</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userDataList.map((list, i) => (
              <tr key={list.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{list.id}</td>
                <td className="border border-gray-300 px-4 py-2"><Image className='rounded-full w-14' src={list.dataset} width={60} height={60} alt='profile Picture'/></td>
                <td className="border border-gray-300 px-4 py-2">{list.name}</td>
                <td className="border border-gray-300 px-4 py-2">{list.email}</td>
                <td className="border border-gray-300 px-4 py-2">{list.message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <UpdateButton defaultValue={list}/>
                  <DeleteButton id={list.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
