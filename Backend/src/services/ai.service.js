import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";

import { ChatMistralAI } from "@langchain/mistralai";
import * as z from "zod";

import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-tiny-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description: "Use this tool to get the latest information from the internet.",
  schema: z.object({
    query: z.string().describe("The search query to look up on the internet."),
  }),
});

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});

// 🔥 STREAMING AI RESPONSE
export async function* generateResponse(messages) {
  console.log(messages);

  const stream = await agent.stream(
    {
      messages: [
        new SystemMessage(`
You are a helpful AI assistant.

Answer the user's question clearly and accurately.

If you do not know the answer, say that you do not know.

If the question requires up-to-date information, use the
"searchInternet" tool.

IMPORTANT:

- Never show the raw output of the searchInternet tool to the user.
- Never show JSON returned by the tool.
- Never show internal tool metadata such as scores, request IDs,
  response times, or search-result objects.
- Read and understand the search results first.
- Use the useful information from the search results to create
  your own clear answer.
- Do not simply copy and paste the search results.
- Do not mention internal tools unless the user specifically asks
  about how the system works.

FORMAT YOUR ANSWERS USING MARKDOWN:

- Use headings when the answer is long.
- Use bullet points for lists.
- Use numbered lists for steps.
- Keep paragraphs short.
- Use **bold** for important terms.
- Use \`inline code\` for small code snippets or technical terms.
- Use fenced code blocks with the correct language for programming code.

For example:

## Main Topic

Brief explanation.

### Key Points

- Point one
- Point two
- Point three

For code:

\`\`\`javascript
const example = "Hello";
console.log(example);
\`\`\`

Keep the response clean, structured, and easy to read.
`),
        ...messages.map((msg) => {
          if (msg.role === "user") {
            return new HumanMessage(msg.content);
          } else if (msg.role === "ai") {
            return new AIMessage(msg.content);
          }
        }),
      ],
    },
    {
      streamMode: "messages",
    },
  );

  for await (const [token, metadata] of stream) {
    // Token ke content ko frontend/controller tak bhejenge
    if (token?.content) {
      yield token.content;
    }
  }
}

// 🔹 Chat title generation
export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      `You are a helpful assistant that generates a title for a chat based on the user's message. The title should be concise, relevant, and capture the essence of the conversation. Please provide the title in a single line without any additional text or formatting. The title should be clear, relevant and engaging giving users a quick understanding of the chat's content. Make sure the title is not too long and contains only 3-4 words`,
    ),

    new HumanMessage(
      `Generate a title for the following message: "${message}"`,
    ),
  ]);

  return response.text;
}
