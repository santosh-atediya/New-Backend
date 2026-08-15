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
  resource_type: "auto" // auto detect karta h file img h video ua other
})
// file has been uploaded successfull
//console.log("file is uploaded on cloudinary",response.url);
fs.unlinkSync(localFilePath) // file remove ho jayegi local path se  jab upload hogi to 
return response;
  }catch(error){
  fs.unlinkSync(localFilePath) // remove the locally saved temp file as upload operation got failed
  return null;
  }
}

export{uploadOnCloudinary}