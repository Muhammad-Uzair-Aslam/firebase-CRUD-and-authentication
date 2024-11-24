'use client';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import dataB from '@/app/firebaseConfig';
import axios from 'axios';
export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");
  const [image,setImage]=useState(null);
  const onchangehandler=(e)=>{
    if(e.target.files)
    {
      setImage(e.target.files[0])
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!image){
        return
      } 
      const formData=new FormData();
      formData.append("image",image);
      const response=await axios.post('/api/uploadImage',formData);
      const data=await response.data;
      const dataset=data.data
      await addDoc(collection(dataB, 'newmessage'), {
        name,
        email,
        message,
        dataset
      });

      alert('Data added successfully!');
      
      setName('');
      setEmail('');
      setMessage('');
      window.location.reload()
    } catch (err) {
      alert('There was an error submitting your data.');
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Profile Picture:
        </label>
        <input
          id="image"
          type="file"
          className="w-full px-3 py-2 border rounded-lg"
          onChange={onchangehandler}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message:
        </label>
        <textarea
          id="message"
          rows="4"
          className="w-full px-3 py-2 border rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg 
           'opacity-50 cursor-not-allowed'
        `}   
      >
        Submit
      </button>
    </form>
  );
}
