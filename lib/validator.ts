import * as z from "zod";

export const eventFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    categoryId: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required."),
    imageUrl: z.string().url(),
    startDateTime: z.date({ required_error: "Start date is required" }),
    endDateTime: z.date({ required_error: "End date is required" }),
    price: z.string().refine(
      (val) => {
        const parsed = Number(val);
        return !isNaN(parsed) && parsed >= 1;
      },
      {
        message: "Price must be a non-negative number",
      }
    ),
    isFree: z.boolean(),
    url: z.string().url("URL must be valid"),
  })
  .superRefine((data, ctx) => {
    if (data.startDateTime && data.endDateTime) {
      if (data.endDateTime <= data.startDateTime) {
        ctx.addIssue({
          code: "custom",
          path: ["endDateTime"],
          message: "End date must be after start date",
        });
      }
    }
  });
