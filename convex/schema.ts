import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookmarks: defineTable({
    userId: v.string(),
    url: v.string(),
    title: v.string(),
    tags: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
