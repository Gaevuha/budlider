import { Router } from "express";
const router = Router();

let userTheme = "light"; // зберігаємо поточну тему

router.get("/", (req, res) => {
  res.json({ theme: userTheme });
});

router.put("/", (req, res) => {
  const { theme } = req.body;
  if (theme === "light" || theme === "dark") {
    userTheme = theme;
    res.json({ theme: userTheme });
  } else {
    res.status(400).json({ message: "Invalid theme" });
  }
});

export default router;
