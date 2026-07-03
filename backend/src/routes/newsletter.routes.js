const express = require("express");
const router = express.Router();
const authenticateAdmin = require("../middlewares/auth.middleware");

const {
  subscribeNewsletter,
  getSubscribers,
  unsubscribeNewsletter,
  deleteSubscriber,
} = require("../controllers/newslatter.controller");

router.post("/", subscribeNewsletter);
router.get("/", authenticateAdmin, getSubscribers);
router.put("/unsubscribe/:email", unsubscribeNewsletter);
router.delete("/:id", authenticateAdmin, deleteSubscriber);

module.exports = router;
