"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagFilterProps {
  activeTag: string | null;
  onTagClick: (tag: string) => void;
}

export function TagFilter({ activeTag, onTagClick }: TagFilterProps) {
  const bookmarks = useQuery(api.bookmarks.list);

  if (!bookmarks || bookmarks.length === 0) return null;

  // Collect all unique tags with counts
  const tagCounts = new Map<string, number>();
  for (const bookmark of bookmarks) {
    for (const tag of bookmark.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  if (tagCounts.size === 0) return null;

  // Sort by count descending
  const sortedTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Filter:</span>
      {sortedTags.map(([tag, count]) => (
        <Badge
          key={tag}
          variant={activeTag === tag ? "default" : "outline"}
          className="cursor-pointer transition-colors"
          onClick={() => onTagClick(tag)}
        >
          {tag}
          <span className="ml-1 text-xs opacity-70">{count}</span>
          {activeTag === tag && <X className="ml-1 h-3 w-3" />}
        </Badge>
      ))}
    </div>
  );
}
