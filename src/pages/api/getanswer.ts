// pages/api/getanswer.ts
import { AzureOpenAI } from "openai";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
// export const runtime = "edge";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Set environment variables or hardcoded values
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = process.env["AZURE_OPENAI_API_KEY"];
    const apiVersion = "2024-08-01-preview";
    const deployment = "gpt-4o"; // This must match your deployment name

    // Initialize AzureOpenAI client with API key-based authentication
    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
      deployment,
    });

    // Prepare the chat completion request
    const result = await client.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content:
            "You are a chatbot for students who helps them by solving questions. You will inspire them at the end of the answer by giving them a quote or by appreciating their question. Mention that some smart children can ask this question, or if it is too basic, say it is good to brush up on the concepts as it is a smart approach.",
        },
        {
          role: "user",
          content: req.body,
        },
      ],
      max_tokens: 1200,
      temperature: 0.3,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: null,
    });

    // Send the response back as JSON
    const messages = result.choices.map((choice) => choice.message);
    res.status(200).json({ messages });
  } catch (err) {
    console.error("The API encountered an error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
