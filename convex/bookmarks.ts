import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
    return bookmarks;
  },
});

export const create = mutation({
  args: {
    url: v.string(),
    title: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    await ctx.db.insert("bookmarks", {
      userId: identity.subject,
      url: args.url,
      title: args.title,
      tags: args.tags,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("bookmarks"),
    url: v.string(),
    title: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const bookmark = await ctx.db.get(args.id);
    if (!bookmark || bookmark.userId !== identity.subject) {
      throw new Error("Bookmark not found");
    }
    await ctx.db.patch(args.id, {
      url: args.url,
      title: args.title,
      tags: args.tags,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("bookmarks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const bookmark = await ctx.db.get(args.id);
    if (!bookmark || bookmark.userId !== identity.subject) {
      throw new Error("Bookmark not found");
    }
    await ctx.db.delete(args.id);
  },
});
