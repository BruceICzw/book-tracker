import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
}).index("by_userId", ["userId"]),

books: defineTable({
    title: v.string(),
    author: v.string(),
    status: v.union(
        v.literal("unread"),
        v.literal("reading"),
        v.literal("read")
    ),
    userId: v.string(),
}).index("by_userId", ["userId"]),
});
