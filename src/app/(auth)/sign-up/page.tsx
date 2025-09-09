"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as  z  from "zod"
import Link from "next/link"
import { useState,useEffect } from "react"
import { useDebounceValue,useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, {AxiosError} from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { Button } from "@react-email/components"
import { Button } from "@/components/ui/button"
import {Loader2} from 'lucide-react'
useRouter
const page = () => {
  const [username, setusername] = useState('')
  const [usernameMessage, setusernameMessage] = useState('')
  const [isCheckingUsername, setisCheckingUsername] = useState(false)
  const [isSubmitting, setisSubmitting] = useState(false)
  

// there is definetly somethong problem with debounce 

  const debounced = useDebounceCallback(setusername,300)
 const router = useRouter()

 // zod implementation
  
 const form = useForm<z.infer<typeof signUpSchema>>({
  resolver: zodResolver(signUpSchema),
  defaultValues:{
    username:'',
    email:'',
    password:''
  }
 })

 useEffect(()=>{ 
  const checkUsernameUnique = async () =>{
    if(username){
      setisCheckingUsername(true)
      setusernameMessage('')
      try {
      const response = await axios.get(`/api/check-username-unique?username=${username}`)
    //   console.log(response.data.message)
      let message = response.data.message
      setusernameMessage(message)
      } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setusernameMessage(
      axiosError.response?.data.message ?? "Error checking username"
      )
      } finally {
        setisCheckingUsername(false)
      }
    }
  }
  checkUsernameUnique()
 },[username])

 const onSubmit = async (data: z.infer<typeof signUpSchema>) =>{
   setisSubmitting(true)
   try {
    const response = await axios.post<ApiResponse>('/api/sign-up',data)
toast.success("Success", {
  description: response.data.message,
})
router.replace(`/verify/${username}`)
setisSubmitting(false)
   } catch (error) {
    console.error("Error in sighup of user",error)
    const axiosError = error as AxiosError<ApiResponse>;
    let errorMessage = axiosError.response?.data.message
toast.error("Sign-up failed", {
  description: errorMessage
})
setisSubmitting(false)
   }
 }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
         name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username"
                 {...field}
                 onChange={(e)=>{
                  field.onChange(e)
                  debounced(e.target.value)
                 }}
                  />
                  
              </FormControl>
             {isCheckingUsername && <Loader2 className="animate-spin"/>}
             <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-green-500':'text-red-500'}`}>test {usernameMessage}</p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
         name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email"
                 {...field}
                  />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
         name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password"
                 {...field}
                  />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {
            isSubmitting ? (
              <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin"/> Please wait
              </>
            ) : ("Sign Up") 
          }
        </Button>
        </form>
        </Form> 
         <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
        </div>
        </div>
  )
}

export default page
