import { UploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    const formdata = await req.formData(); // Parse the incoming form data
    const image = formdata.get("image"); 
    const data= await UploadImage(image,"nextjs-formdata");
    // const docRef=await addDoc(collection(dataB,"formImages"),{url:data,createdAt:new Date(),})
    
    // Extract the "image" field
    if (!image) {
      return NextResponse.json(
        { message: "No image file provided" },
        { status: 400 } // Bad Request
      );
    }

    // You can process or save the image here if needed

    return NextResponse.json(
      { message: "Image received successfully", image: image.name ,data:data }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
};
