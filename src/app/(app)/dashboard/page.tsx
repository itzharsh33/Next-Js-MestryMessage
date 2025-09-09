// "use client"

// import { Button } from "@/components/ui/button"
// import { Message } from "@/model/User"
// import { isAcceptingMessageSchema } from "@/schemas/acceptMessageSchema"
// import { ApiResponse } from "@/types/ApiResponse"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Separator } from "@radix-ui/react-separator"
// import { Switch } from "@radix-ui/react-switch"
// import axios, { AxiosError } from "axios"
// import { Loader2, RefreshCcw } from "lucide-react"
// import { User } from "next-auth"
// import { useSession } from "next-auth/react"
// import { useCallback, useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"
// // import { useCopyToClipboard } from "usehooks-ts"
// import MessageCard from "@/components/MessageCard"

// const page = () => {
//   const [messages, setmessages] = useState<Message[]>([])
//   const [isLoading, setisLoading] = useState(false)
//   const [isSwitchLoading, setisSwitchLoading] = useState(false)

// const handleDeleteMessage = (messageId:string) =>{
//   setmessages(messages.filter((message)=>message._id!==messageId))
// }

// const {data:session} = useSession()

// const form = useForm({
//   resolver: zodResolver(isAcceptingMessageSchema)
// })

// const {register,watch,setValue} = form;

// const acceptMessages = watch('acceptMessages')

// const fetchAcceptMessage = useCallback(async ()=>{
//   setisSwitchLoading(true)

// try {
//   const response = await axios.get<ApiResponse>('/api/accept-messages')
//   setValue('acceptMessages',response.data.isAcceptingMessages ?? false)

// } catch (error) {
//   const axiosError = error as AxiosError<ApiResponse>;


// toast.error("Error", {
//   description: axiosError.response?.data.message ?? 'Failed to fetch message settings',
// });

// } finally {
//   setisSwitchLoading(false)
// }

// },[setValue])

// const fetchMessages = useCallback( async (refresh:boolean=false)=>{
//   setisLoading(true)
//   setisSwitchLoading(false)
//   try {
//   const response = await axios.get<ApiResponse>('/api/get-messages')
//   setmessages(response.data.messages || []);
//          if (refresh) {
//        toast("Refreshed Messages", {
//   description: "Showing latest messages",
// })
//         }
//   } catch (error) {
//   const axiosError = error as AxiosError<ApiResponse>;


// toast.error("Error", {
//   description: axiosError.response?.data.message ?? 'Failed to fetch message settings',
// });
//   } finally {
//     setisLoading(false)
//   setisSwitchLoading(false)
// }

// },[setisLoading,setmessages])

// useEffect(() => {
// if(!session || !session.user) return 
// fetchMessages()
// fetchAcceptMessage()
// }, [session,setValue,fetchAcceptMessage,fetchMessages])

// const handleSwitchChange = async()=>{
//   try {
// const response =   await axios.post<ApiResponse>('/api/accept-messages',{
//     acceptMessages:!acceptMessages
//   })
//   setValue('acceptMessages',!acceptMessages)
// toast(response.data.message)

//   } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;


// toast.error("Error", {
//   description: axiosError.response?.data.message ?? 'Failed to fetch message settings',
// });

//   }
// }

//   if (!session || !session.user) {
//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Loader2 className="h-8 w-8 animate-spin" />
//             <p className="ml-2">Loading...</p>
//         </div>
//     )
//   }

// // const {username} = session?.user as User
// // const baseUrl = `${window.location.protocol}//${window.location.host}`
//   const username = session.user.username;
//   const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
// const profileUrl = `${baseUrl}/u/${username}`

// const copyToClickboard = () =>{
//   navigator.clipboard.writeText(profileUrl)
//   toast('Profile URL Copied!', {
//   description: 'The profile URL has been copied to your clipboard.',
// });
// }
// if(!session||!session.user){
//   return <div>Please Login</div>
// }

//   return (
//      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//       <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={profileUrl}
//             disabled
//             className="input input-bordered w-full p-2 mr-2"
//           />
//           {/* <Button onClick={useCopyToClipboard}>Copy</Button>*/}
//           <Button onClick={copyToClickboard}>Copy</Button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <Switch
//           {...register('acceptMessages')}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//         />
//         <span className="ml-2">
//           Accept Messages: {acceptMessages ? 'On' : 'Off'}
//         </span>
//       </div>
//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <MessageCard
//               key={message._id}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           ))
//         ) : (
//           <p>No messages to display.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default page






















// for better ui i am commenting it

// "use client"

// import { Button } from "@/components/ui/button"
// import { Message } from "@/model/User"
// import { isAcceptingMessageSchema } from "@/schemas/acceptMessageSchema"
// import { ApiResponse } from "@/types/ApiResponse"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Separator } from "@/components/ui/separator"
// import { Switch } from "@/components/ui/switch"
// import axios, { AxiosError } from "axios"
// import { Loader2, RefreshCcw } from "lucide-react"
// import { useSession } from "next-auth/react"
// import { useCallback, useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"
// import MessageCard from "@/components/MessageCard"

// const Page = () => {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false)

//   const { data: session } = useSession()

//   const form = useForm({
//     resolver: zodResolver(isAcceptingMessageSchema)
//   })

//   const { register, watch, setValue } = form;
//   const acceptMessages = watch('acceptMessages')

//   const handleDeleteMessage = (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId))
//   }

//   const fetchAcceptMessage = useCallback(async () => {
//     setIsSwitchLoading(true)
//     try {
//       const response = await axios.get<ApiResponse>('/api/accept-messages')
//       setValue('acceptMessages', response.data.isAcceptingMessages ?? false)
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error("Error", {
//         description: axiosError.response?.data.message ?? 'Failed to fetch message settings',
//       });
//     } finally {
//       setIsSwitchLoading(false)
//     }
//   }, [setValue])

//   const fetchMessages = useCallback(async (refresh: boolean = false) => {
//     setIsLoading(true)
//     setIsSwitchLoading(false)
//     try {
//       const response = await axios.get<ApiResponse>('/api/get-messages')
//       setMessages(response.data.messages || []);
//       if (refresh) {
//         toast("Refreshed Messages", {
//           description: "Showing latest messages",
//         })
//       }
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error("Error", {
//         description: axiosError.response?.data.message ?? 'Failed to fetch messages',
//       });
//     } finally {
//       setIsLoading(false)
//       setIsSwitchLoading(false)
//     }
//   }, [setIsLoading, setMessages])

//   useEffect(() => {
//     if (!session || !session.user) return
//     fetchMessages()
//     fetchAcceptMessage()
//   }, [session, fetchAcceptMessage, fetchMessages])

//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post<ApiResponse>('/api/accept-messages', {
//         acceptMessages: !acceptMessages
//       })
//       setValue('acceptMessages', !acceptMessages)
//       toast.success(response.data.message)
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error("Error", {
//         description: axiosError.response?.data.message ?? 'Failed to update message settings',
//       });
//     }
//   }

//   if (!session || !session.user) {
//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Loader2 className="h-8 w-8 animate-spin" />
//             <p className="ml-2">Loading...</p>
//         </div>
//     )
//   }

//   const username = session.user.username;
//   const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
//   const profileUrl = `${baseUrl}/u/${username}`

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl)
//     toast.success('Profile URL Copied!', {
//       description: 'The profile URL has been copied to your clipboard.',
//     });
//   }

//   return (
//     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//       <h1 className="text-3xl md:text-4xl font-bold mb-4">User Dashboard</h1>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//           <input
//             type="text"
//             value={profileUrl}
//             disabled
//             className="input input-bordered w-full p-2"
//           />
//           <Button onClick={copyToClipboard} className="w-full sm:w-auto cursor-pointer">Copy</Button>
//         </div>
//       </div>

//       <div className="mb-4 flex items-center">
//         <Switch
//           {...register('acceptMessages')}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//           id="accept-messages"
//           className="cursor-pointer"
//         />
//         <label htmlFor="accept-messages" className="ml-2 ">
//           Accept Messages: {acceptMessages ? 'On' : 'Off'}
//         </label>
//       </div>
//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message) => (
//             <MessageCard
//               key={message._id as string}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           ))
//         ) : (
//           <p>No messages to display.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Page































// "use client"

// import { Button } from "@/components/ui/button"
// import { Message } from "@/model/User"
// import { isAcceptingMessageSchema } from "@/schemas/acceptMessageSchema"
// import { ApiResponse } from "@/types/ApiResponse"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Separator } from "@/components/ui/separator"
// import { Switch } from "@/components/ui/switch"
// import axios, { AxiosError } from "axios"
// import { Loader2, RefreshCcw } from "lucide-react"
// import { useSession } from "next-auth/react"
// import { useCallback, useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"
// import MessageCard from "@/components/MessageCard"

// const Page = () => {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false)

//   const { data: session } = useSession()

//   const form = useForm({
//     resolver: zodResolver(isAcceptingMessageSchema)
//   })

//   const { register, watch, setValue } = form;
//   const acceptMessages = watch('acceptMessages')

//   const handleDeleteMessage = (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId))
//   }

//   const fetchAcceptMessage = useCallback(async () => {
//     setIsSwitchLoading(true)
//     try {
//       const response = await axios.get<ApiResponse>('/api/accept-messages')
//       setValue('acceptMessages', response.data.isAcceptingMessages ?? false)
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error("Error", {
//         description: axiosError.response?.data.message ?? 'Failed to fetch message settings',
//       });
//     } finally {
//       setIsSwitchLoading(false)
//     }
//   }, [setValue])

//   const fetchMessages = useCallback(async (refresh: boolean = false) => {
//     setIsLoading(true)
//     setIsSwitchLoading(false)
//     try {
//       const response = await axios.get<ApiResponse>('/api/get-messages')
//       setMessages(response.data.messages || []);
//       if (refresh) {
//         toast("Refreshed Messages", {
//           description: "Showing latest messages",
//         })
//       }
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error("Error", {
//         description: axiosError.response?.data.message ?? 'Failed to fetch messages',
//       });
//     } finally {
//       setIsLoading(false)
//       setIsSwitchLoading(false)
//     }
//   }, [setIsLoading, setMessages])

//   useEffect(() => {
//     if (!session || !session.user) return
//     fetchMessages()
//     fetchAcceptMessage()
//   }, [session, fetchAcceptMessage, fetchMessages])

//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post<ApiResponse>('/api/accept-messages', {
//         acceptMessages: !acceptMessages
//       })
//       setValue('acceptMessages', !acceptMessages)
//       toast.success(response.data.message)
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error("Error", {
//         description: axiosError.response?.data.message ?? 'Failed to update message settings',
//       });
//     }
//   }

//   if (!session || !session.user) {
//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
//             <Loader2 className="h-8 w-8 animate-spin" />
//             <p className="ml-2">Loading...</p>
//         </div>
//     )
//   }

//   const username = session.user.username;
//   const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
//   const profileUrl = `${baseUrl}/u/${username}`

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl)
//     toast.success('Profile URL Copied!', {
//       description: 'The profile URL has been copied to your clipboard.',
//     });
//   }

//   return (
//     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded-xl w-full max-w-6xl 
//       bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white shadow-2xl backdrop-blur-lg">
      
//       <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-pink-300">
//         User Dashboard
//       </h1>

//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//           <input
//             type="text"
//             value={profileUrl}
//             disabled
//             className="w-full p-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/50"
//           />
//           <Button onClick={copyToClipboard} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer">
//             Copy
//           </Button>
//         </div>
//       </div>

//       <div className="mb-6 flex items-center">
//         <Switch
//           {...register('acceptMessages')}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//           id="accept-messages"
//           className="cursor-pointer data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-gray-400"
//         />
//         <label htmlFor="accept-messages" className="ml-2 font-medium">
//           Accept Messages: {acceptMessages ? 'On' : 'Off'}
//         </label>
//       </div>

//       <Separator className="bg-white/30" />

//       <Button
//         className="mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:scale-105 transition-transform"
//         variant="default"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message) => (
//             <div key={message._id as string} className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
//               <MessageCard
//                 message={message}
//                 onMessageDelete={handleDeleteMessage}
//               />
//             </div>
//           ))
//         ) : (
//           <p className="text-white/80">No messages to display.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Page










"use client"

import { Button } from "@/components/ui/button"
import { Message } from "@/model/User"
import { isAcceptingMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import axios, { AxiosError } from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import MessageCard from "@/components/MessageCard"

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(isAcceptingMessageSchema)
  })

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages')

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessages ?? false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description: axiosError.response?.data.message ?? 'Failed to fetch message settings',
      });
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || []);
      if (refresh) {
        toast("Refreshed Messages", {
          description: "Showing latest messages",
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description: axiosError.response?.data.message ?? 'Failed to fetch messages',
      });
    } finally {
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  }, [setIsLoading, setMessages])

  useEffect(() => {
    if (!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()
  }, [session, fetchAcceptMessage, fetchMessages])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessages', !acceptMessages)
      toast.success(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description: axiosError.response?.data.message ?? 'Failed to update message settings',
      });
    }
  }

  if (!session || !session.user) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            <p className="ml-2 text-gray-300">Loading...</p>
        </div>
    )
  }

  const username = session.user.username;
  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success('Profile URL Copied!', {
      description: 'The profile URL has been copied to your clipboard.',
    });
  }

  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      {/* Gradient Background Shapes (same as AboutPage) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[60vw] h-[60vw] bg-blue-900/30 rounded-full blur-3xl" />
        <div className=" absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-purple-900/30 rounded-full blur-3xl" />
      </div>

      <div className=" mx-4 md:mx-8 lg:mx-auto p-6 bg-gray-800/60 border border-gray-700 rounded-2xl w-full max-w-6xl backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">User Dashboard</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-indigo-400">Copy Your Unique Link</h2>{' '}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300"
            />
            <Button onClick={copyToClipboard} className="w-full sm:w-auto cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30">
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <Switch
            {...register('acceptMessages')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
            id="accept-messages"
            className="cursor-pointer data-[state=checked]:bg-indigo-600"
          />
          <label htmlFor="accept-messages" className="ml-2 text-gray-300">
            Accept Messages: {acceptMessages ? 'On' : 'Off'}
          </label>
        </div>
        <Separator className="bg-gray-700" />
          
        <div className=" flex items-center gap-x-2">
          <span className="text-xl font-bold text-indigo-400">Your Messages</span>
            <Button
          className="mt-4  bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
          ) : (
            <RefreshCcw className="h-4 w-4 text-indigo-400" />
          )}
        </Button>
        </div>
    
      

        <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard 
               
                key={message._id as string}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p className="text-gray-400">No messages to display.</p>
          )}
        </div>
      </div>
    
    </div>
      
  )
}

export default Page
