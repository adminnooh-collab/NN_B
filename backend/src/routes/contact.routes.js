const express = require("express");
const router = express.Router();
// contacts endpoints are public (subscribe) and listing is public now

const { createContact, getContacts } = require("../controllers/controller.controller");

router.post("/", createContact);
router.get("/", getContacts);

module.exports = router;
