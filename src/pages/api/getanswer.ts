// pages/api/getanswer.ts
import { NextRequest } from "next/server";

export const runtime = "edge"; // Ensure this API route runs on the edge

export default async function handler(req: NextRequest) {
  try {
    const { msg } = await req.json();

    // Environment variables
    const endpoint = "https://ai-shiksha076844560258.openai.azure.com";
    const apiKey =
      "AhmAjyCTxBZaLiCmOUcVAtFAXLYw57uPt8FnrnxVA5w4F7P4QWQ6JQQJ99AKACYeBjFXJ3w3AAAAACOGGkjN";
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
              "You are a chatbot for students who helps them by solving questions. You will inspire them at the end of the answer by giving them a quote or by appreciating their question. Mention that some smart children can ask this question, or if it is too basic, say it is good to brush up on the concepts as it is a smart approach.",
          },
          {
            role: "user",
            content: msg,
          },
        ],
        max_tokens: 1200,
        temperature: 0.3,
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
