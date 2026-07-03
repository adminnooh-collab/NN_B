const express = require("express");
const router = express.Router();

const {
  subscribeNewsletter,
  getSubscribers,
  unsubscribeNewsletter,
  deleteSubscriber,
} = require("../controllers/newslatter.controller");

router.post("/", subscribeNewsletter);
router.get("/", getSubscribers);
router.put("/unsubscribe/:email", unsubscribeNewsletter);
router.delete("/:id", deleteSubscriber);

module.exports = router;
