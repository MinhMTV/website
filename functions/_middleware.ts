// _middleware.ts
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";
import { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ name: "ACME Support", email: "minhv90@gmail.com" }],
    },
  ],
  from: {
    name: "ACME Support",
    email: "minhv90@gmail.com",
  },
  respondWith: () => {
    return new Response(
      `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
    );
  },
});
