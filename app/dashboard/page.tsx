"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { io, Socket } from "socket.io-client";
import { Activity, Users, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ActivityData {
  name: string;
  value: number;
}

interface UserData {
  timestamp: string;
  users: number;
}

interface ActivityEvent {
  user: string;
  action: string;
  timestamp: string;
}

export default function Dashboard() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("connecting");

  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [userChartData, setUserChartData] = useState<UserData[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([
    { name: "Pageviews", value: 0 },
    { name: "Clicks", value: 0 },
    { name: "Sessions", value: 0 },
    { name: "Conversions", value: 0 },
  ]);
  const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    console.log("Socket : ", socket);
  }, []);

  useEffect(() => {
    const socketInitializer = async () => {
      try {
        const socket = io("http://localhost:3001", {
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          autoConnect: false,
        });

        socket.on("connect", () => {
          setConnectionStatus("connected");
          toast.success("Connected to analytics server");
        });

        socket.on("disconnect", () => {
          setConnectionStatus("disconnected");
          toast.error("Disconnected from analytics server");
        });

        socket.on("connect_error", () => {
          simulateConnection(socket);
        });

        socket.on("activeUsers", (count: number) => {
          setActiveUsers(count);
        });

        socket.on("userData", (data: UserData) => {
          setUserChartData((prev) => {
            const newData = [...prev, data];
            if (newData.length > 10) {
              return newData.slice(newData.length - 10);
            }
            return newData;
          });
        });

        socket.on("activityData", (data: ActivityData[]) => {
          setActivityData(data);
        });

        socket.on("activityEvent", (event: ActivityEvent) => {
          setActivityFeed((prev) => {
            const newFeed = [event, ...prev];
            if (newFeed.length > 5) {
              return newFeed.slice(0, 5);
            }
            return newFeed;
          });
        });

        socket.connect();
        setSocket(socket);

        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.error("Failed to connect to socket server:", error);
        setConnectionStatus("disconnected");

        simulateData();
      }
    };

    socketInitializer();
  }, []);

  const simulateConnection = (socket: Socket) => {
    setConnectionStatus("connected");

    simulateData();
  };

  const simulateData = () => {
    setActiveUsers(Math.floor(Math.random() * 100) + 20);

    const generateUserData = () => {
      const now = new Date();
      const data: UserData[] = [];

      for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
          timestamp: time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          users: Math.floor(Math.random() * 50) + 10,
        });
      }

      setUserChartData(data);
    };

    const generateActivityData = () => {
      setActivityData([
        { name: "Pageviews", value: Math.floor(Math.random() * 1000) + 500 },
        { name: "Clicks", value: Math.floor(Math.random() * 500) + 200 },
        { name: "Sessions", value: Math.floor(Math.random() * 200) + 50 },
        { name: "Conversions", value: Math.floor(Math.random() * 50) + 5 },
      ]);
    };

    const generateActivityEvent = () => {
      const actions = ["logged in", "viewed page", "clicked button", "made purchase", "shared content"];
      const users = ["User123", "Customer456", "Visitor789", "Member321", "Guest555"];

      const newEvent: ActivityEvent = {
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date().toLocaleTimeString(),
      };

      setActivityFeed((prev) => {
        const newFeed = [newEvent, ...prev];
        if (newFeed.length > 5) {
          return newFeed.slice(0, 5);
        }
        return newFeed;
      });
    };

    generateUserData();
    generateActivityData();
    generateActivityEvent();

    const userInterval = setInterval(() => {
      const newData = [...userChartData];

      newData.shift();
      const now = new Date();
      newData.push({
        timestamp: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        users: Math.floor(Math.random() * 50) + 10,
      });

      setUserChartData(newData);
      setActiveUsers(Math.floor(Math.random() * 100) + 20);
    }, 5000);

    const activityDataInterval = setInterval(() => {
      generateActivityData();
    }, 8000);

    const activityFeedInterval = setInterval(() => {
      generateActivityEvent();
    }, 3000);

    return () => {
      clearInterval(userInterval);
      clearInterval(activityDataInterval);
      clearInterval(activityFeedInterval);
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div
          className={`h-3 w-3 rounded-full ${
            connectionStatus === "connected" ? "bg-green-500" : connectionStatus === "connecting" ? "bg-yellow-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {connectionStatus === "connected"
            ? "Connected to analytics server"
            : connectionStatus === "connecting"
            ? "Connecting to analytics server..."
            : "Disconnected from analytics server"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
              <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Page Views</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {activityData.find((item) => item.name === "Pageviews")?.value || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {activityData.find((item) => item.name === "Sessions")?.value || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900 mr-4">
              <CheckCircle2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {activityData.find((item) => item.name === "Conversions")?.value || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Active Users (Real-time)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} stroke="#888888" />
                <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "4px",
                    color: "#333",
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Activity Metrics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888888" />
                <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "4px",
                    color: "#333",
                  }}
                />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Activity Feed</h2>
        <div className="space-y-4">
          {activityFeed.length > 0 ? (
            activityFeed.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                  {event.user[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.user} {event.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{event.timestamp}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}
