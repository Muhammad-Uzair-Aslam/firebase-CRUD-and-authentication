import { UploadImage } from "@/lib/uploadImage";
import {  NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    const formdata = await req.formData(); // Parse the incoming form data
    const image = formdata.get("image"); 
    const data= await UploadImage(image,"nextjs-formdata");
    if (!image) {
      return NextResponse.json(
        { message: "No image file provided" },
        { status: 400 } // Bad Request
      );
    }
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
