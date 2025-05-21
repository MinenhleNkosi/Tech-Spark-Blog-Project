
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BlogPostFormFieldsProps {
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
}

export default function BlogPostFormFields({
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
}: BlogPostFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">Publication Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label htmlFor="author" className="text-sm font-medium">Author</label>
        <Input
          id="author"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium">Excerpt/Description</label>
        <Textarea
          id="excerpt"
          placeholder="Enter a short description of the post"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="text-sm font-medium">Tags</label>
        <Input
          id="tags"
          placeholder="Enter tags separated by commas (e.g., React, JavaScript, Frontend)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-medium">Image URL (optional)</label>
        <Input
          id="image"
          placeholder="Enter image URL for the post (if left blank, a default image will be used)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
    </>
  );
}
