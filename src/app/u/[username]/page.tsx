// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// // import { useCompletion } from 'ai/react';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// // import { Textarea } from '@/components/ui/textarea';
// // import { toast } from '@/components/ui/use-toast';
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { messageSchema } from '@/schemas/messageSchema';

// const specialChar = '||';

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar);
// };

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?";

// export default function SendMessage() {
//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const {
//     complete,
//     completion,
//     isLoading: isSuggestLoading,
//     error,
//   } = useCompletion({
//     api: '/api/suggest-messages',
//     initialCompletion: initialMessageString,
//   });

//   const form = useForm<z.infer<typeof messageSchema>>({
//     resolver: zodResolver(messageSchema),
//   });

//   const messageContent = form.watch('content');

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data: z.infer<typeof messageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast({
//         title: response.data.message,
//         variant: 'default',
//       });
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Error',
//         description:
//           axiosError.response?.data.message ?? 'Failed to sent message',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchSuggestedMessages = async () => {
//     try {
//       complete('');
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       // Handle error appropriately
//     }
//   };

//   return (
//     <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         Public Profile Link
//       </h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Send Anonymous Message to @{username}</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your anonymous message here"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex justify-center">
//             {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isLoading || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//           <Button
//             onClick={fetchSuggestedMessages}
//             className="my-4"
//             disabled={isSuggestLoading}
//           >
//             Suggest Messages
//           </Button>
//           <p>Click on any message below to select it.</p>
//         </div>
//         <Card>
//           <CardHeader>
//             <h3 className="text-xl font-semibold">Messages</h3>
//           </CardHeader>
//           <CardContent className="flex flex-col space-y-4">
//             {error ? (
//               <p className="text-red-500">{error.message}</p>
//             ) : (
//               parseStringMessages(completion).map((message, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   className="mb-2"
//                   onClick={() => handleMessageClick(message)}
//                 >
//                   {message}
//                 </Button>
//               ))
//             )}
//           </CardContent>
//         </Card>
//       </div>
//       <Separator className="my-6" />
//       <div className="text-center">
//         <div className="mb-4">Get Your Message Board</div>
//         <Link href={'/sign-up'}>
//           <Button>Create Your Account</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }





// second code

// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import * as z from 'zod';

// // Mock ApiResponse type as it's not available
// interface ApiResponse {
//   message: string;
//   success: boolean;
// }

// // Define the message schema directly in the file
// const messageSchema = z.object({
//   content: z
//     .string()
//     .min(10, { message: 'Content must be at least 10 characters.' })
//     .max(300, { message: 'Content must be no longer than 300 characters.' }),
// });

// // Hardcoded suggested messages
// const suggestedMessages = [
//   "What's your favorite movie?",
//   'Do you have any pets?',
//   "What's your dream job?",
//   'What is something you are proud of?',
//   'What is a hobby you would love to get into?',
// ];

// export default function SendMessage() {
//   // Since useParams from next/navigation is not available,
//   // we'll use a placeholder username. In a real app,
//   // you might get this from window.location or props.
//   const username = 'defaultUser';

//   const form = useForm<z.infer<typeof messageSchema>>({
//     resolver: zodResolver(messageSchema),
//   });

//   const messageContent = form.watch('content');

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data: z.infer<typeof messageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast.success(response.data.message);

//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
      
//       toast.error(
//         axiosError.response?.data.message ?? 'Failed to send message'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const [showMessages, setShowMessages] = useState(false);

//   return (
//     <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         Public Profile Link
//       </h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Send Anonymous Message to @{username}</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your anonymous message here"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex justify-center">
//             {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isLoading || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//           <Button
//             onClick={() => setShowMessages(!showMessages)}
//             className="my-4"
//           >
//             {showMessages ? 'Hide Messages' : 'Suggest Messages'}
//           </Button>
//           <p>Click on any message below to select it.</p>
//         </div>
//         {showMessages && (
//             <Card>
//             <CardHeader>
//                 <h3 className="text-xl font-semibold">Messages</h3>
//             </CardHeader>
//             <CardContent className="flex flex-col space-y-4">
//                 {suggestedMessages.map((message, index) => (
//                 <Button
//                     key={index}
//                     variant="outline"
//                     className="mb-2"
//                     onClick={() => handleMessageClick(message)}
//                 >
//                     {message}
//                 </Button>
//                 ))}
//             </CardContent>
//             </Card>
//         )}
//       </div>
//       <Separator className="my-6" />
//       <div className="text-center">
//         <div className="mb-4">Get Your Message Board</div>
//         {/* Replaced Next.js Link with a standard anchor tag */}
//         <a href="/sign-up">
//           <Button>Create Your Account</Button>
//         </a>
//       </div>
//     </div>
//   );
// }




















// i am commenting this for better ui

// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { messageSchema } from '@/schemas/messageSchema';

// // Hardcoded suggested messages
// const suggestedMessages = [
//   "What's your favorite movie?",
//   'Do you have any pets?',
//   "What's your dream job?",
//   'What is something you are proud of?',
//   'What is a hobby you would love to get into?',
// ];

// export default function SendMessagePage() {
//   // Restore useParams to get the username from the URL
//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const form = useForm<z.infer<typeof messageSchema>>({
//     resolver: zodResolver(messageSchema),
//   });

//   const messageContent = form.watch('content');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showMessages, setShowMessages] = useState(false);

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const onSubmit = async (data: z.infer<typeof messageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast.success(response.data.message);
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error(
//         axiosError.response?.data.message ?? 'Failed to send message'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         Public Profile
//       </h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 {/* This will now correctly display the username from the URL */}
//                 <FormLabel>Send Anonymous Message to @{username}</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your anonymous message here"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex justify-center">
//             {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait...
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isLoading || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//           <Button
//             onClick={() => setShowMessages(!showMessages)}
//             className="my-4"
//           >
//             {showMessages ? 'Hide Suggestions' : 'Suggest Messages'}
//           </Button>
//           <p>Click on any message below to select it.</p>
//         </div>
//         {showMessages && (
//             <Card>
//             <CardHeader>
//                 <h3 className="text-xl font-semibold">Suggested Messages</h3>
//             </CardHeader>
//             <CardContent className="flex flex-col space-y-4">
//                 {suggestedMessages.map((message, index) => (
//                 <Button
//                     key={index}
//                     variant="outline"
//                     className="mb-2"
//                     onClick={() => handleMessageClick(message)}
//                 >
//                     {message}
//                 </Button>
//                 ))}
//             </CardContent>
//             </Card>
//         )}
//       </div>
//       <Separator className="my-6" />
//       <div className="text-center">
//         <div className="mb-4">Get Your Own Message Board</div>
//         <Link href={'/sign-up'}>
//           <Button>Create Your Account</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }



















// i am commenting it just to add ai integration


// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { messageSchema } from '@/schemas/messageSchema';

// const suggestedMessages = [
//   "What's your favorite movie?",
//   'Do you have any pets?',
//   "What's your dream job?",
//   'What is something you are proud of?',
//   'What is a hobby you would love to get into?',
// ];

// export default function SendMessagePage() {
//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const form = useForm<z.infer<typeof messageSchema>>({
//     resolver: zodResolver(messageSchema),
//   });

//   const messageContent = form.watch('content');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showMessages, setShowMessages] = useState(false);

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const onSubmit = async (data: z.infer<typeof messageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast.success(response.data.message);
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error(
//         axiosError.response?.data.message ?? 'Failed to send message'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen relative">
//       {/* Background Gradient Shapes */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[60vw] h-[60vw] bg-blue-900/30 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-purple-900/30 rounded-full blur-3xl" />
//       </div>

//       <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
//         <h1 className="text-4xl font-bold mb-6 text-center animate-text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Public Profile
//         </h1>

//         <div className="p-6 bg-gray-800/50 border border-gray-700/60 rounded-2xl backdrop-blur-sm">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="content"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-200">
//                       Send Anonymous Message to @{username}
//                     </FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Write your anonymous message here"
//                         className="resize-none bg-gray-900/60 text-gray-100 border border-gray-700 rounded-xl"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex justify-center">
//                 {isLoading ? (
//                   <Button
//                     disabled
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white"
//                   >
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait...
//                   </Button>
//                 ) : (
//                   <Button
//                     type="submit"
//                     disabled={isLoading || !messageContent}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white"
//                   >
//                     Send It
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </div>

//         <div className="space-y-4 my-10">
//           <div className="space-y-2 text-center">
//             <Button
//               onClick={() => setShowMessages(!showMessages)}
//               className="my-4 bg-indigo-600 hover:bg-indigo-700 text-white"
//             >
//               {showMessages ? 'Hide Suggestions' : 'Suggest Messages'}
//             </Button>
//             <p className="text-gray-300">
//               Click on any message below to select it.
//             </p>
//           </div>
//           {showMessages && (
//             <Card className="bg-gray-800/50 border border-gray-700/60 text-gray-100 backdrop-blur-sm">
//               <CardHeader>
//                 <h3 className="text-xl font-semibold">Suggested Messages</h3>
//               </CardHeader>
//               <CardContent className="flex flex-col space-y-4">
//                 {suggestedMessages.map((message, index) => (
//                   <Button
//                     key={index}
//                     variant="outline"
//                     className="mb-2  border-gray-300  text-gray-700 hover:bg-indigo-600 hover:text-white"
//                     onClick={() => handleMessageClick(message)}
//                   >
//                     {message}
//                   </Button>
//                 ))}
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         <Separator className="my-6 bg-gray-700" />
//         <div className="text-center text-gray-300">
//           <div className="mb-4">Get Your Own Message Board</div>
//           <Link href={'/sign-up'}>
//             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
//               Create Your Account
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


























'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

export default function SendMessagePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggesting(true);
    try {
      const response = await axios.post('/api/suggest-messages');
      if (response.data.success) {
        setSuggestedMessages(response.data.messages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Failed to fetch suggestions");
    } finally {
      setIsSuggesting(false);
      setShowMessages(true);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ?? 'Failed to send message'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[60vw] h-[60vw] bg-blue-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-purple-900/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center animate-text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Public Profile
        </h1>

        <div className="p-6 bg-gray-800/50 border border-gray-700/60 rounded-2xl backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">
                      Send Anonymous Message to @{username}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here"
                        className="resize-none bg-gray-900/60 text-gray-100 border border-gray-700 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                {isLoading ? (
                  <Button
                    disabled
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || !messageContent}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Send It
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        <div className="space-y-4 my-10">
          <div className="space-y-2 text-center">
            <Button
              onClick={() => {
                if (suggestedMessages.length === 0) {
                  fetchSuggestedMessages();
                } else {
                  setShowMessages(!showMessages);
                }
              }}
              disabled={isSuggesting}
              className="my-4 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSuggesting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : showMessages ? (
                'Hide Suggestions'
              ) : (
                'Suggest Messages'
              )}
            </Button>
            <p className="text-gray-300">
              Click on any message below to select it.
            </p>
          </div>
          {showMessages && (
            <Card className="bg-gray-800/50 border border-gray-700/60 text-gray-100 backdrop-blur-sm">
              <CardHeader>
                <h3 className="text-xl font-semibold">Suggested Messages</h3>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                {suggestedMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="mb-2 border-gray-300 text-gray-300 bg-transparent hover:bg-indigo-600 hover:text-white"
                    onClick={() => handleMessageClick(message)}
                  >
                    {message}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="my-14 bg-gray-700" />
        <div className="text-center text-gray-300">
          <div className="mb-4">Get Your Own Message Board</div>
          <Link href={'/sign-up'}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}