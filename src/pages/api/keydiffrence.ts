// pages/api/getanswer.ts
import { NextRequest } from "next/server";
import supabase from "../../../supabase";

export const runtime = "edge"; // Ensure this API route runs on the edge

export default async function handler(req: NextRequest) {
  async function Name() {
    let { data: schools, error } = await supabase.from("schools").select("*");
    console.log(schools);
  }
  Name();
  try {
    // Environment variables
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "AZURE_OPENAI_API_KEY environment variable is not defined"
      );
    }
    const apiVersion = "2024-08-01-preview"; // Verify the correct API version
    const deployment = "gpt-4o"; // Your deployment name

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

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
              "You are a chatbot which suggests key diffrences between the school based on fees , Location , Facilities , Computer Lab Facilities , Skills and Activities , Skills and Activities , Exam Pattern , Passing Ratio , Student Teacher Ratio ,Passing Ratio",
          },
          {
            role: "user",
            content: "msg",
          },
        ],
        max_tokens: 2000,
        temperature: 0.1,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      console.error(response.statusText);
      return new Response(
        JSON.stringify({
          error: "Failed to get response from Azure OpenAI API",
        }),
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log(data);
    const messages = data.choices.map((choice: any) => choice.message);
    return new Response(JSON.stringify({ messages }), { status: 200 });
  } catch (err) {
    // throw err;
    console.error(err);

    if (err instanceof Error) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    });
  }
}
