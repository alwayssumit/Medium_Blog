import z from "zod";

export const SignupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const SigninInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const createBlogInput=z.object({
    title:z.string(),
    content:z.string(),
})

export const updateBlogInput=z.object({
    title:z.string(),
    content:z.string(),
    id: z.number()
})

export type SignupInput=z.infer<typeof SignupInput> 
export type SigninInput=z.infer<typeof SigninInput>
export type createBlogInput=z.infer<typeof createBlogInput>
export type updateBlogInput=z.infer<typeof updateBlogInput>