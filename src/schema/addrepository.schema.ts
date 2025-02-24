import { z } from "zod";


export const addRepositorySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  author_names: z.string().min(3, "Author names must be at least 3 characters long"),
  url_repository: z.string().url("Invalid URL format"),
  date_published: z.string().refine(
    (date) => !isNaN(Date.parse(date)), 
    { message: "Invalid date format" }
  ),
  select_focus: z.string().nonempty("Focus cannot be empty"),
  select_commodity: z.string().nonempty("Commodity cannot be empty"),
  select_category:z.string().nonempty("Category cannot be empty"),
});

export type AddRepositoryType = z.infer<typeof addRepositorySchema>;