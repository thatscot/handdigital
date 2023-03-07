import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

const adapter = new JSONFile(file);
const db = new Low(adapter);

const jsonParser = bodyParser.json();

await db.read();
db.data ||= { times: [] };

dotenv.config();

const appOrigins = [
  process.env.THREE_APP_URL,
  process.env.HANDS_APP_URL,
  "http://localhost:5000",
  "http://localhost:5173",
];

console.log("Allowed Origins ", appOrigins);

const app = express();
app.use(
  cors({
    origin: appOrigins,
  })
);
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: appOrigins,
    methods: ["GET", "POST"],
  },
});

const sessions = {};

io.on("connection", (socket) => {
  const uuid = socket.handshake.auth.uuid;

  if (uuid) sessions[uuid] = { sessionId: socket.id };

  socket.on("command", ({ command, uuid }) => {
    console.log(command, uuid);
    const { name, lifecycle } = command;
    const sessionId = sessions[uuid]?.sessionId;

    if (!sessionId) {
      console.log(`No Session found using sessionId: ${sessionId}`);
    }

    if (sessionId) {
      io.to(sessionId).emit("message", { name, lifecycle });
    }
  });

  socket.on("time", async (time) => {
    if (time > 0) {
      db.data.times.push(time);
      await db.write();
      io.emit("time", getBestTime());
    }
  });
});

app.post("/authenticate", jsonParser, (req, res) => {
  res.send({ authenticated: !!sessions[req.body.uuid] });
});

const getBestTime = () => {
  return db.data.times.sort((a, b) => a - b)[0];
};

httpServer.listen(process.env.PORT || "3000", () => {
  console.log("listening on *:3000");
});
