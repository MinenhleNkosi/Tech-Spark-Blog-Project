
import * as z from "zod";

// Profile data type
export interface ProfileData {
  name: string;
  jobTitle: string;
  city: string;
  summary: string;
  profileImage: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string | null;
}

// Form schema for validation
export const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  jobTitle: z.string().min(2, { message: "Job title is required" }),
  city: z.string().min(2, { message: "City is required" }),
  summary: z.string().min(10, { message: "Summary should be at least 10 characters long" }),
  githubUrl: z.string().url({ message: "Please enter a valid URL" }),
  linkedinUrl: z.string().url({ message: "Please enter a valid URL" })
});
