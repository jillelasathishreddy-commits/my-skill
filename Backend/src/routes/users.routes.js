const express = require("express");
const { z } = require("zod");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { getProfile, updateProfile } = require("../controllers/users.controller");

const router = express.Router();

const updateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).optional(),
    avatar: z.string().trim().min(1).max(4).optional(),
  }),
  params: z.object({}),
  query: z.object({}),
});

router.get("/me", protect, getProfile);
router.patch("/me", protect, validate(updateSchema), updateProfile);

module.exports = router;
