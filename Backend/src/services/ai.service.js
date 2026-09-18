import dotenv from "dotenv";
dotenv.config();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage,AIMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-tiny-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const response = await geminiModel.invoke(messages.map(msg=>{
    if(msg.role==='user'){
      return new HumanMessage(msg.content)
    }
    else if(msg.role==='ai'){
      return new AIMessage(msg.content)
    }
  }));
  return response.text;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      `You are a helpful assistant that generates a title for a chat based on the user's message. The title should be concise, relevant, and capture the essence of the conversation. Please provide the title in a single line without any additional text or formatting.The title should be clear,relevant and engaging giving users a quick understanding of the the chats content Make sure the title is not too long and contains only 3-4 words`,
    ),
    new HumanMessage(
      `Generate a title for the following message: "${message}"`,
    ),
  ]);

  return response.text;
}
