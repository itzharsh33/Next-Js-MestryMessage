// import { openai } from '@ai-sdk/openai';
// import { streamText, UIMessage, convertToModelMessages } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
// try {
//       const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: openai('gpt-4o'),
//     messages: convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
// } catch (error) {
//  if (error instanceof Error && (error as any).cause) {
//       // Provider error (e.g. OpenAI API returned 4xx/5xx)
//       const cause = (error as any).cause;
//       return Response.json(
//         {
//           name: error.name,
//           message: error.message,
//           status: cause?.status,
//           headers: cause?.headers,
//         },
//         { status: cause?.status ?? 500 }
//       );
//     } else {
//       // General error
//       console.error('Unexpected error:', error);
//       return Response.json(
//         { message: 'Internal Server Error' },
//         { status: 500 }
//       );
//     }
// }

// } 













// This route handler uses the new AI SDK to perform a specific text generation task.
// It is the modern equivalent of your second code snippet.





// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     // The prompt from your original second snippet is hardcoded here.
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     // Use the `streamText` function from the new AI SDK.
//     const result = streamText({
//       // Specify the model to use. 'gpt-4o-mini' is a good, fast, and cost-effective choice.
//       // You can also use 'gpt-4o' if you prefer.
//       model: openai('gpt-4o-mini'), 
      
//       // Pass the hardcoded prompt as a single user message.
//       // The new SDK uses a `messages` array even for single prompts.
//       messages: [
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//     });

//     // Return the streaming response.
//     // The `toTextStreamResponse()` method is used for raw text output, similar to your second snippet.
//     return result.toTextStreamResponse();
//   } catch (error) {
//     if (error instanceof Error && (error as any).cause) {
//       // Handle provider errors (e.g., OpenAI API issues).
//       const cause = (error as any).cause;
//       return Response.json(
//         {
//           name: error.name,
//           message: error.message,
//           status: cause?.status,
//           headers: cause?.headers,
//         },
//         { status: cause?.status ?? 500 }
//       );
//     } else {
//       // Handle general errors.
//       console.error('An unexpected error occurred:', error);
//       return Response.json(
//         { message: 'Internal Server Error' },
//         { status: 500 }
//       );
//     }
//   }
// }




















import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      return NextResponse.json({ success: false, message: "API key is not configured." }, { status: 500 });
    }

    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ success: false, message: errorData.error.message || 'API call failed' }, { status: response.status });
    }

    const result = await response.json();
    const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return NextResponse.json({ success: false, message: 'No suggestions were generated.' }, { status: 500 });
    }

    const messages = generatedText.split('||').map((msg: string) => msg.trim()).filter((msg:string) => msg.length > 0);

    return NextResponse.json({ success: true, messages });

  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}
