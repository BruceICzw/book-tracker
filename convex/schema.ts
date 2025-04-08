import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    books: defineTable({
        title: v.string(),
        author: v.string(),
        status: v.union(v.literal("unread"), v.literal("reading"), v.literal("read")),
        userId: v.string(),
    }).index('by_userId', ['userId']),

    //Clerk user sync table (import for auth integration)
    users: defineTable({
        userId: v.string(), // Clerk user ID
        email: v.string(), // Clerk email
    }).index('by_userId', ['userId']),
})
