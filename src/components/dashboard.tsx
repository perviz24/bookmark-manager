"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { type Doc } from "../../convex/_generated/dataModel";
import { AddBookmarkForm } from "@/components/add-bookmark-form";
import { BookmarkList } from "@/components/bookmark-list";
import { EditBookmarkDialog } from "@/components/edit-bookmark-dialog";
import { DeleteBookmarkDialog } from "@/components/delete-bookmark-dialog";
import { TagFilter } from "@/components/tag-filter";
import { Separator } from "@/components/ui/separator";

export function Dashboard() {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [editingBookmark, setEditingBookmark] =
    useState<Doc<"bookmarks"> | null>(null);
  const [deletingBookmark, setDeletingBookmark] =
    useState<Doc<"bookmarks"> | null>(null);

  const updateBookmark = useMutation(api.bookmarks.update);
  const removeBookmark = useMutation(api.bookmarks.remove);

  function handleTagClick(tag: string) {
    setFilterTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Bookmarks</h1>
        <p className="text-muted-foreground mt-1">
          Save and organize your favorite links
        </p>
      </div>

      <AddBookmarkForm />

      <Separator />

      <TagFilter activeTag={filterTag} onTagClick={handleTagClick} />

      <BookmarkList
        filterTag={filterTag}
        onTagClick={handleTagClick}
        onEdit={setEditingBookmark}
        onDelete={setDeletingBookmark}
      />

      <EditBookmarkDialog
        bookmark={editingBookmark}
        onClose={() => setEditingBookmark(null)}
        onSave={async (data) => {
          if (!editingBookmark) return;
          await updateBookmark({ id: editingBookmark._id, ...data });
          setEditingBookmark(null);
        }}
      />

      <DeleteBookmarkDialog
        bookmark={deletingBookmark}
        onClose={() => setDeletingBookmark(null)}
        onConfirm={async () => {
          if (!deletingBookmark) return;
          await removeBookmark({ id: deletingBookmark._id });
          setDeletingBookmark(null);
        }}
      />
    </div>
  );
}
