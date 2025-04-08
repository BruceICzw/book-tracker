import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

//Get all books for current user
export const getBooks = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("books")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

// Add a new book to the collection

export const addBook = mutation({
    args: {
        title: v.string(),
        author: v.string(),
        status: v.union(
            v.literal("unread"),
            v.literal("reading"),
            v.literal("read")
        ),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (process.env.NODE_ENV === "development") {
            console.log("Identity:", identity); // Debug identity
        }

        if (!identity) throw new Error("User not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .unique();
        if (process.env.NODE_ENV === "development") {
            console.log("User found:", user); // Debug user existence
        }

        if (!user) throw new Error("User not found in Database");

        await ctx.db.insert("books", {
            ...args,
            userId: identity.subject,
        });
        if (process.env.NODE_ENV === "development") {
            console.log("Book inserted:", args); // Debug book insertion
        }
    },
});

// Update book status
export const updateStatus = mutation({
  args: {
    bookId: v.id("books"),
    newStatus: v.union(
      v.literal("unread"),
      v.literal("reading"),
      v.literal("read")
    ),
  },
  handler: async (ctx, {bookId, newStatus}) => {
    await ctx.db.patch(bookId, {
      status: newStatus,
    });
  },
});
