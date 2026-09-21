import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      state.chats[chatId].messages.push({ content, role });
    },
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages.push(...messages);
    },
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// chat = {
// "docker and aws":{
// messages:[
//     {
//         role: "user",
//         content: "How to deploy docker container on aws?"
//     },
//     {
//         role: "assistant",
//         content: "To deploy a Docker container on AWS, you can use Amazon Elastic Container Service (ECS) or AWS Fargate. Here are the general steps:\n\n1. Create a Docker image of your application and push it to a container registry like Amazon Elastic Container Registry (ECR).\n2. Create an ECS cluster.\n3. Define a task definition that specifies the Docker image and resource requirements.\n4. Create a service that runs the task definition on the ECS cluster.\n5. Configure networking and security settings as needed.\n6. Deploy the service and monitor its status."
//     },
//     {
//         role: "user",
//         content: "Can you provide a sample task definition for ECS?"
//     },
//     {
//         role: "assistant",
//         content: "Sure! Here's a sample task definition for ECS in JSON format:\n\n```json\n{\n  \"family\": \"my-ecs-task\",\n  \"containerDefinitions\": [\n    {\n      \"name\": \"my-container\",\n      \"image\": \"my-docker-image:latest\",\n      \"memory\": 512,\n      \"cpu\": 256,\n      \"essential\": true,\n      \"portMappings\": [\n        {\n          \"containerPort\": 80,\n          \"hostPort\": 80\n        }\n      ]\n    }\n  ]\n}\n```\n\nIn this example, the task definition is named `my-ecs-task`, and it defines a single container named `my-container` that uses the Docker image `my-docker-image:latest`. The container is allocated 512 MB of memory and
//     }
// ],
// id: "docker and aws"
// lastUpdated: "2023-08-15T12:34:56Z"
// }}

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
