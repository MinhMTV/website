export async function onRequestPost(context) {
    try {
        return await handleRequest(context);
        console.log("test")
    } catch (e) {
        console.error(e);
        return new Response("Error sending message", { status: 500 });
    }
}

async function handleRequest({ request }) {
    const ip = request.headers.get("CF-Connecting-IP");
    console.log("test")
    const formData = await request.formData();
    const name = formData.get("i-fullname");
    const email = formData.get("i-email");
    const subject = formData.get("i-subject");
    const message = formData.get("i-message");
    const token = formData.get("cf-turnstile-response");

    const tokenValidated = await validateToken(ip, token);

    if (!tokenValidated) {
        return new Response("Token validation failed", { status: 403 });
    }

    await forwardMessage(name, email, subject, message);

    return new Response("OK", { status: 200 });
}

async function validateToken(ip, token) {
    const TURNSTILE_SECRET_KEY = "0x4AAAAAAAPfo1BaRbrUD_6h_iGPVdDt-vo";
    console.log("test")
    const formData = new FormData();
    formData.append("secret", TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const result = await fetch(url, {
        body: formData,
        method: "POST",
    });

    const outcome = await result.json();

    return outcome.success;
}

async function forwardMessage(name, email,subject, message) {
    // Forward the message to an email address, webhook etc.
}
