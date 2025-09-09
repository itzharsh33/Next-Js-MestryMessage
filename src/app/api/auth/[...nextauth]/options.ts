import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers:[
       CredentialsProvider({

        id:'credentials',
        name:'Credentials',
        credentials: {
      identifier: { label: "Email", type: "text"},
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials:any):Promise<any>{
   await dbConnect();
   try {
  const user =   await UserModel.findOne({
        $or: [
            {email:credentials.identifier},
             {username:credentials.identifier}
        ]
    })
    if(!user){
    throw new Error("No user found with this email or username")
    }

      if(!user.isVerified){
    throw new Error('Please verify your account first before login')
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
   
   if(isPasswordCorrect){
    return user;
   }else{
     throw new Error('Incorrect password')
   }

   } catch (err:any) {
    // used by sir
    //  throw new Error(err)
    throw new Error(err.message || "Login error");
   }
    }
}) 
    ],
    callbacks:{
    async jwt({ token, user }) {
        if(user){
            token._id=user._id?.toString()
            token.isVerified = user.isVerified;
            token.isAcceptingMessages = user.isAcceptingMessages
            token.username = user.username;
            
        }
      return token
    },
      async session({ session, token }) {
        if(token){
          // used by sir
          // session.user._id = token._id
          // session.user.isVerified = token.isVerified
          // session.user.isAcceptingMessages = token.isAcceptingMessages
          // session.user.username = token.username
        (session.user as any)._id = token._id;
        (session.user as any).isVerified = token.isVerified;
        (session.user as any).isAcceptingMessages = token.isAcceptingMessages;
        (session.user as any).username = token.username;
        }
      return session
    },
    },
  
      pages: {
        // used by sir
    // signIn: '/auth/signin',
     signIn: "/sign-in",
      },
      session:{
        strategy:"jwt"
      },
      secret:process.env.NEXTAUTH_SECRET
}






