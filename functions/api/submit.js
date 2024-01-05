// export async function onRequestPost(context) {
//     try {
//         return await handleRequest(context);
//     } catch (e) {
//         console.error(e);
//         return new Response("Error sending message", { status: 500 });
//     }
// }

// async function handleRequest({ request }) {
//     const ip = request.headers.get("CF-Connecting-IP");

//     const formData = await request.formData();
//     const name = formData.get("i-fullname");
//     const email = formData.get("i-email");
//     const subject = formData.get("i-subject");
//     const message = formData.get("i-message");
//     const token = formData.get("cf-turnstile-response");

//     const tokenValidated = await validateToken(ip, token);

//     if (!tokenValidated) {
//         return new Response("Token validation failed", { status: 403 });
//     }

//     const sendStatus = await forwardMessage(name, email, subject, message);
//     console.error(sendStatus);
//     return sendStatus ? new Response("OK", { status: 200 }) : new Response("Error sending email", { status: 500 });
// }

// async function validateToken(ip, token) {
//     const TURNSTILE_SECRET_KEY = "0x4AAAAAAAPfo1BaRbrUD_6h_iGPVdDt-vo";

//     const formData = new FormData();
//     formData.append("secret", TURNSTILE_SECRET_KEY);
//     formData.append("response", token);
//     formData.append("remoteip", ip);

//     const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

//     const result = await fetch(url, {
//         body: formData,
//         method: "POST",
//     });

//     const outcome = await result.json();

//     return outcome.success;
// }

// async function forwardMessage(name, email, subject, message) {
//     const mailchannelsEndpoint = "https://api.mailchannels.net/tx/v1/send";
//     const mailBody = JSON.stringify({
//         "personalizations": [{
//             "to": [{"email": "manminni@yahoo.de", "name": name}]
//         }],
//         "from": {
//             "email": "minhtv@web.de",
//             "name": "Minh"
//         },
//         "subject": subject,
//         "content": [{
//             "type": "text/plain",
//             "value": message
//         }]
//     });
    
//     try {
//         const response = await fetch(mailchannelsEndpoint, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: mailBody
//         });

//         if (!response.ok) {
//             const errorDetails = await response.text();
//             error = console.error("MailChannels API error response:", errorDetails);
//             return error;
//         }

//         return true;
//     } catch (error) {
//         error = console.error("Error sending email through MailChannels:", error);
//         return error;
//     }
// }



