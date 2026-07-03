const express = require("express");
const router = express.Router();
// testimonials are public endpoints

const {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

router.post("/", createTestimonial);
router.get("/", getTestimonials);
router.get("/:id", getTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
