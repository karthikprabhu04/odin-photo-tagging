import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express + PostgreSQL Server Running");
});

// Backend route to check responses
app.post("/api/validate", async (req, res) => {
  const { character, x, y } = req.body;

  const char = await prisma.character.findUnique({
    where: { name: character },
  });

  const tolerance = 3; // how much error in %
  const correct =
    Math.abs(char.x - x) < tolerance &&
    Math.abs(char.y - y) < tolerance;

  res.json({ correct });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
