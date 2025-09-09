import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernamevalidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username:usernamevalidation
})

export async function GET(request:Request){
// TODO: use this in all other routes

// if(request.method!=='GET'){
// return Response.json({
//   success:false,
//   message:'Method not allowed'
//   },{status:405})
// }

await dbConnect()
// localhost:3000/api/cuu?username=hitesh?phone=android

try {
    const {searchParams} = new URL(request.url)
    const queryParam = {
        username: searchParams.get('username')
    }
    // validate with zod
    const result = usernameQuerySchema.safeParse(queryParam)
    console.log(result)  // TODO: remove
    if(!result.success){
        // const usernameErrors=result.error.format().username?._errors
          const tree = z.treeifyError(result.error);
//   const usernameErrors = tree.username?._errors;
  const usernameErrors = tree.properties?.username?.errors||[];
  return Response.json({
  success:false,
  message:usernameErrors?.length>0
  ?usernameErrors.join(',')
  :'Invalid query parameter'
  },{status:400})
    }
    const {username} = result.data
    const existingVerifiedUser = await UserModel.findOne({
        username,
        isVerified:true
    })
    if(existingVerifiedUser){
return Response.json({
  success:false,
  message:'Username is already taken'
  },{status:400})
    }
    return Response.json({
  success:true,
  message:'Username is unique'
  },{status:200})
} catch (error) {
    console.error("error checking username", error)
    return Response.json(
        {
            success:false,
            message:"Error checking username"
        },
        {status:500}
    )
}

}
