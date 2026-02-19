"use client";

import { useState } from "react";
import { type Doc } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteBookmarkDialogProps {
  bookmark: Doc<"bookmarks"> | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteBookmarkDialog({
  bookmark,
  onClose,
  onConfirm,
}: DeleteBookmarkDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await onConfirm();
      toast.success("Bookmark deleted");
    } catch {
      toast.error("Failed to delete bookmark.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={bookmark !== null} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete bookmark?</DialogTitle>
          <DialogDescription>
            This will permanently delete &ldquo;{bookmark?.title}&rdquo;. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
