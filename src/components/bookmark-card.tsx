"use client";

import { type Doc } from "../../convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, MoreVertical, Pencil, Trash2 } from "lucide-react";

interface BookmarkCardProps {
  bookmark: Doc<"bookmarks">;
  onEdit: (bookmark: Doc<"bookmarks">) => void;
  onDelete: (bookmark: Doc<"bookmarks">) => void;
  onTagClick: (tag: string) => void;
}

export function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
  onTagClick,
}: BookmarkCardProps) {
  return (
    <Card className="group relative">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base leading-tight truncate">
              {bookmark.title}
            </CardTitle>
            <CardDescription className="truncate mt-1">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                {bookmark.url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 40)}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(bookmark)}>
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(bookmark)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {bookmark.tags.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {bookmark.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
