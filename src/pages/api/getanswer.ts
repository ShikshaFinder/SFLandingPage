// pages/api/getanswer.ts
import { NextRequest } from "next/server";

export const runtime = "edge";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default async function handler(req: NextRequest) {
  try {
    const { msg, imageUrl, conversationHistory } = await req.json();

    // Environment variables
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "AZURE_OPENAI_API_KEY environment variable is not defined"
      );
    }
    const apiVersion = "2024-02-15-preview";
    const deployment = "gpt-4o";

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    // Convert conversation history to OpenAI message format
    const previousMessages =
      conversationHistory?.map((msg: ConversationMessage) => ({
        role: msg.role,
        content: msg.content,
      })) || [];

    // Prepare the messages array based on whether an image is included
    const userMessage = imageUrl
      ? {
          role: "user",
          content: [
            {
              type: "text",
              text: msg,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        }
      : {
          role: "user",
          content: msg,
        };

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
              "You are a chatbot for students who helps them by solving questions. You can analyze both text and images. You will inspire them at the end of the answer by giving them a quote or by appreciating their question. Mention that some smart children can ask this question, or if it is too basic, say it is good to brush up on the concepts as it is a smart approach. When answering follow-up questions, refer to the previous conversation context to provide more relevant and contextual answers.",
          },
          ...previousMessages,
          userMessage,
        ],
        max_tokens: 1500,
        temperature: 0.3,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true, // Enable streaming
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

    // Create a TransformStream for processing the response
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk);
        const lines = text.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              return;
            }
            try {
              const json = JSON.parse(data);
              const content = json.choices[0]?.delta?.content || "";
              if (content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
              if (json.choices[0]?.finish_reason === "stop") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                return;
              }
            } catch (e) {
              console.error("Error parsing JSON:", e);
              // Don't throw error, just log it and continue
              continue;
            }
          }
        }
      },
      async flush(controller) {
        try {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (e) {
          console.error("Error in flush:", e);
        }
      },
    });

    return new Response(response.body?.pipeThrough(stream), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
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
