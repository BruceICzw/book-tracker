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
    console.log(identity);
    if (!identity) throw new Error("User not authenticated");

    await ctx.db.insert("books", {
      ...args,
      userId: identity.subject,
    });
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
  handler: async (ctx, args) => {
    await ctx.db.patch(args.bookId, {
      status: args.newStatus,
    });
  },
});
