const express = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const { signup, login, logout, me } = require("../controllers/auth.controller");

const router = express.Router();

const signupSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  params: z.object({}),
  query: z.object({}),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  params: z.object({}),
  query: z.object({}),
});

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", protect, me);

module.exports = router;
