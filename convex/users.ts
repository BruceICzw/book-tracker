import { mutation } from "./_generated/server";

export const syncUser = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("Identity:", identity); // Debug identity

        if (!identity) throw new Error("User not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .unique();
        console.log("User found:", user); // Debug user existence

        if (!user) {
            await ctx.db.insert("users", {
                userId: identity.subject,
                email: identity.email || "",
            });
            console.log("User inserted:", identity.subject); // Debug user insertion
        }
    },
});