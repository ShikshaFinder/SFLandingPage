import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge"; // Ensure this API route runs on the edge

// Initialize Supabase client for server-side use
const supabase = createClient(
  "https://qgkjakomwapzuhvnrvgr.supabase.co", // Your Supabase URL from environment variables
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFna2pha29td2FwenVodm5ydmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTg5NTMsImV4cCI6MjAxNjg5NDk1M30.kXMYhUTiLU5ExesCDPkulohSsz9LAdy96oYK2Ws243M" // Your Supabase Key from environment variables
);

export default async function handler(req: NextRequest) {
  try {
    // Fetch data from the Supabase `schools` table
    const { data: schools, error } = await supabase.from("School").select("user_id,discription,schoolname").eq("District", "Amreli");
    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }

    console.log("Fetched Schools:", schools);

    // Environment variables for Azure OpenAI
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    if (!apiKey || !endpoint) {
      throw new Error(
        "Azure OpenAI credentials are not set in environment variables."
      );
    }

    const apiVersion = "2024-08-01-preview"; // Correct API version
    const deployment = "gpt-4o"; // Your deployment name

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    // Extract user query from the request
    const { msg } = await req.json();

    // Make a request to Azure OpenAI
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that provides information about schools.",
          },
          {
            role: "user",
            content: msg,
          },
          {
            role: "system",
            content: `Here is the data we have: ${JSON.stringify(schools)}`,
          },
        ],
        max_tokens: 1500,
        temperature: 0,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      throw new Error(`Azure OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log("Azure OpenAI Response:", data);
    const messages = data.choices.map((choice: any) => choice.message);

    return new Response(JSON.stringify({ schools, messages }), { status: 200 });
  } catch (err) {
    console.error(err);

    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
