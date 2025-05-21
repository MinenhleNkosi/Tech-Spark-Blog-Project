
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { getRandomDefaultImage } from "./form/DefaultBlogImages";
import BlogPostFormDialog from "./form/BlogPostFormDialog";

interface CreateBlogPostFormProps {
  onPostCreated: (post: any) => void;
}

export default function CreateBlogPostForm({ onPostCreated }: CreateBlogPostFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields except image URL
    if (!title || !excerpt || !author || !date || !tags) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Use a default image if the user didn't provide one
    const finalImageUrl = imageUrl.trim() || getRandomDefaultImage();

    // Create new blog post
    const newPost = {
      id: Date.now(), // Generate a unique ID
      title,
      excerpt,
      author,
      date: format(date, "MMMM d, yyyy"),
      tags: tags.split(",").map(tag => tag.trim()),
      likes: 0,
      isLiked: false,
      image: finalImageUrl,
    };

    // Call the callback to add the post
    onPostCreated(newPost);
    
    // Reset form and close dialog
    resetForm();
    setIsOpen(false);
    
    toast({
      title: "Blog post created",
      description: "Your blog post has been successfully created",
    });
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setAuthor("");
    setDate(new Date());
    setTags("");
    setImageUrl("");
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="flex items-center gap-2 bg-tech-blue hover:bg-tech-blue/90"
      >
        <Plus className="h-4 w-4" /> Create New Post
      </Button>

      <BlogPostFormDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
        onSubmit={handleSubmit}
      />
    </>
  );
}
