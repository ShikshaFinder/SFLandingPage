// pages/api/getanswer.ts
import { AzureOpenAI } from "openai";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Set environment variables or hardcoded values
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = process.env["AZURE_OPENAI_API_KEY"];
    const apiVersion = "2024-05-01-preview";
    const deployment = "talkwithdoc"; // This must match your deployment name

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
            "You are a helpful AI that can answer questions about science and technology.",
        },
        {
          role: "user",
          content: req.body,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: null,
    });

    // Send the response back as JSON
    const messages = result.choices.map(
      (choice: { message: any }) => choice.message
    );
    res.status(200).json({ messages });
  } catch (err) {
    console.error("The API encountered an error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
