// _middleware.ts
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";
import { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: (data) => {
    const formData = new URLSearchParams(data.request.body);
    const email = formData.get("i-email");
    
    return [
    //   {
    //     to: [{ name: "User", email: email }],
    //   },
      // Your hardcoded email
      {
        to: [{ name: "test", email: "minht@web.de"}],
      }
    ];
  },
  from: {
    name: "Info",
    email: "minht@web.de",
  },
  respondWith: () => {
    return new Response(
      `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
    );
  },
});