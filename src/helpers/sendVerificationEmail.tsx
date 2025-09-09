// // import * as React from "react";
// // import * as React from "react";
// import { render } from '@react-email/render';
// import {resend} from "@/lib/resend"
// import VerificationEmail from "../../emails/VerificationEmail"
// // import VerificationEmail from "@/emails/VerificationEmails";
// import { ApiResponse } from "@/types/ApiResponse"

// export async function sendVerificationEmail(
//     email:string,
//     username:string,
//     verifyCode:string
// ): Promise<ApiResponse>{
//     try{
//         await resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: email,
//   subject: 'Mistry Message | Verification Code',
// //   react: VerificationEmail({username,otp:verifyCode}),
//  html: emailHtml,
// //   react: <VerificationEmail username={username} otp={verifyCode} />,
// // react: React.createElement(VerificationEmail, { username, otp: verifyCode }),
// // text: "Hello test email"

// });
//    return {success:true,message:'Verification email send successfully'}
//     }catch(emailError){
//    console.error("error sending verification email",emailError);
//     return {success:false,message:'failed to send verification email'}
//     }
// }




// sendVerificationEmail.tsx
import { render } from '@react-email/components';
import VerificationEmail from '../../emails/VerificationEmail';
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        // Use the new, asynchronous render function and await its result
        const emailHtml = await render(
            <VerificationEmail username={username} otp={verifyCode} />,
            { pretty: true }
        );

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry Message | Verification Code',
            html: emailHtml,
        });

        return { success: true, message: 'Verification email sent successfully' };
    } catch (emailError) {
        console.error("error sending verification email", emailError);
        return { success: false, message: 'Failed to send verification email' };
    }
}