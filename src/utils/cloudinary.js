import {v2 as cloudinary} from "cloudinary";
import fs from "fs" // file ko read ,write and save karne me by default node me rahta hai
import { type } from "os";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) =>{
  try{
if(!localFilePath) return null
//upload the file on cloudinary
const response =  await cloudinary.uploader.upload(localFilePath,{
  resourse_type: "auto"
})
// file has been uploaded successfull
console.log("file is uploaded on cloudinary",response.url);
return response;
  }catch(error){
  fs.unlinkSync(localFilePath) // remove the locally saved temp file as upload operation got failed
  return null;
  }
}

export{uploadOnCloudinary}