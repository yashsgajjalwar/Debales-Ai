import { NextRequest } from "next/server";
import { Server as NetServer } from "net";
import { Server as IOServer, ServerOptions } from "socket.io";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiResponseServerIO } from "@/lib/types";

const initGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

async function handleChatMessage(message: string, socket: any) {
  try {
    const genAI = initGeminiClient();

    if (!genAI) {
      socket.emit("message", {
        id: Date.now().toString(),
        content: "Sorry, there's an issue connecting to the AI service. Please make sure the GEMINI_API_KEY environment variable is set.",
        sender: "support",
        timestamp: new Date(),
      });
      return;
    }

    socket.emit("processingStatus", { status: "processing" });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();

      socket.emit("message", {
        id: Date.now().toString(),
        content: text,
        sender: "support",
        timestamp: new Date(),
      });
    } catch (genAIError) {
      socket.emit("message", {
        id: Date.now().toString(),
        content: "I'm having trouble processing your request. Please try again with a different question.",
        sender: "support",
        timestamp: new Date(),
      });
    }

    socket.emit("processingStatus", { status: "complete" });
  } catch (error) {
    socket.emit("message", {
      id: Date.now().toString(),
      content: "Sorry, I encountered an error processing your request.",
      sender: "support",
      timestamp: new Date(),
    });
    socket.emit("processingStatus", { status: "error" });
  }
}

export async function GET(req: NextRequest) {
  const res = {} as NextApiResponseServerIO;
  const httpServer: NetServer = (req as any).socket?.server || (res as any).socket?.server;

  if (!httpServer) {
    return new Response("Internal Server Error: HTTP server not found", { status: 500 });
  }

  if (!(httpServer as any).io) {
    const options: Partial<ServerOptions> = {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
      pingTimeout: 60000,
    };
    const io = new IOServer(httpServer as any, options);

    (httpServer as any).io = io;

    io.on("connection", (socket) => {
      socket.emit("message", {
        id: "welcome",
        content: "Welcome to our AI-powered chat! How can I help you today?",
        sender: "support",
        timestamp: new Date(),
      });

      socket.on("userMessage", (message: string) => {
        socket.emit("messageReceived", { status: "received" });
        handleChatMessage(message, socket);
      });

      socket.on("disconnect", () => {});

      socket.on("connect_error", (err) => {});
    });
  } else {
  }

  return new Response("Socket.IO server is running", { status: 200 });
}

export const dynamic = "force-dynamic";
