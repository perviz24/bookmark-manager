"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { type Doc } from "../../convex/_generated/dataModel";
import { BookmarkCard } from "@/components/bookmark-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark } from "lucide-react";

interface BookmarkListProps {
  filterTag: string | null;
  onTagClick: (tag: string) => void;
  onEdit: (bookmark: Doc<"bookmarks">) => void;
  onDelete: (bookmark: Doc<"bookmarks">) => void;
}

export function BookmarkList({
  filterTag,
  onTagClick,
  onEdit,
  onDelete,
}: BookmarkListProps) {
  const bookmarks = useQuery(api.bookmarks.list);

  // Loading state
  if (bookmarks === undefined) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  // Filter by tag if active
  const filtered = filterTag
    ? bookmarks.filter((b) => b.tags.includes(filterTag))
    : bookmarks;

  // Empty state
  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="rounded-full bg-muted p-3">
          <Bookmark className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">
            {filterTag ? `No bookmarks tagged "${filterTag}"` : "No bookmarks yet"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {filterTag
              ? "Try a different tag or clear the filter"
              : "Add your first bookmark using the form above"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((bookmark) => (
        <BookmarkCard
          key={bookmark._id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
