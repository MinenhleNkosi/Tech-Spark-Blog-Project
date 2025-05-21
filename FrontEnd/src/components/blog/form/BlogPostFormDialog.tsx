
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BlogPostFormFields from "./BlogPostFormFields";

interface BlogPostFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  setTitle: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  tags: string;
  setTags: (value: string) => void;
  imageUrl: string;
  setImageUrl: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BlogPostFormDialog({
  isOpen,
  setIsOpen,
  title,
  setTitle,
  excerpt,
  setExcerpt,
  author,
  setAuthor,
  date,
  setDate,
  tags,
  setTags,
  imageUrl,
  setImageUrl,
  onSubmit,
}: BlogPostFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>
            Fill in the details for your new blog post.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <BlogPostFormFields 
            title={title}
            setTitle={setTitle}
            excerpt={excerpt}
            setExcerpt={setExcerpt}
            author={author}
            setAuthor={setAuthor}
            date={date}
            setDate={setDate}
            tags={tags}
            setTags={setTags}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
