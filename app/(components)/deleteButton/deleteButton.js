"use client"
import dataB from '@/app/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
export default function DeleteButton(props) {
    const deleteData=async(id)=>{
        try {
          const deleted=await deleteDoc(doc(dataB,"newmessage",id))
          alert("deleted Successfully")
          window.location.reload()
          return deleted
        } catch (error) {
          console.error("error")
        }
      }
  return (
    <div>
        <button className="text-red-500 hover:underline" onClick={()=>deleteData(props.id)}>Delete</button>
    </div>
  )
}
