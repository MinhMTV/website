// _middleware.ts
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";
import { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = async (context) => {
    // Read form data asynchronously
    const formData = await context.request.formData();
    const email = formData.get("i-email") || "default@example.com"; // Default email if not provided
    const subject = formData.get("i-subject") || "New Contact Form Submission"; // Default subject
    const message = formData.get("i-message") || "No message provided"; // Default message

    return mailChannelsPlugin({
        personalizations: [{
            to: [{ name: "Your Name", email: "manminni@yahoo.de" }], // Your receiving email address
            subject: subject,
        }],
        from: {
            name: "Contact Form",
            email: "minhtv@web.de", // Replace with your sending email address
        },
        content: (submission) => [{
            type: "text/plain",
            value: `New message from: ${email}\nSubject: ${subject}\nMessage: ${message}`
        }],
        respondWith: () => {
            return new Response(
                `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`,
                { status: 200 }
            );
        },
    })(context);
};
