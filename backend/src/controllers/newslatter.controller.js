const Newsletter = require("../models/Newsletter");

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return res.status(200).json({ success: true, message: "Re-subscribed successfully", data: existing });
      }
      return res.status(409).json({ success: false, message: "Email already subscribed" });
    }

    const subscriber = await Newsletter.create({ email: email.trim().toLowerCase() });

    res.status(201).json({ success: true, message: "Subscribed successfully", data: subscriber });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.unsubscribeNewsletter = async (req, res) => {
  try {
    const subscriber = await Newsletter.findOne({ email: req.params.email.toLowerCase() });

    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({ success: true, message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    await Newsletter.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Subscriber deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
