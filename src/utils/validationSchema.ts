import { object, string } from "yup";
export const createNoteSchema = object({
  title: string().required().trim().max(80),
  description: string().optional().trim().max(500),
});
