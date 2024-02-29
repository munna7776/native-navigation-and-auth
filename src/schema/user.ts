import { z } from "zod"

export const userSignupSchema = z.object({
    name: z.string({required_error: "Name is required."}).min(3, {message: "Name must be atleast 3 characters."}),
    email: z.string().email({message: "Email is required."}),
    password: z.string({required_error: "Password is required."}).min(6, { message: "Password must be atleast 6 characters." }),
    confirmPassword: z.string({required_error: "Confirm Password is required."}).min(6, { message: "Confirm Password must be atleast 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"]
})

export type UserSignup = z.infer<typeof userSignupSchema>;


export const userLoginSchema = z.object({
    email: z.string().email({message: "Email is required."}),
    password: z.string({required_error: "Password is required."}).min(6, { message: "Password must be atleast 6 characters." }),
})

export type UserLogin = z.infer<typeof userLoginSchema>