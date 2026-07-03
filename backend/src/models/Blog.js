const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    image: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    content: { type: String, required: true },
    author: { type: String, default: "Admin" },
    category: { type: String, default: "" },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

blogSchema.pre("save", async function () {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

module.exports = mongoose.model("Blog", blogSchema);
