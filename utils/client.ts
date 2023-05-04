import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "nxm1t6u2",
  dataset: "production",
  apiVersion: "2023-05-04",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
