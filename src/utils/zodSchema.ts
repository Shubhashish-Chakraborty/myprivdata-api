
import { z } from "zod";

export const signupValidationSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    // contactNumber: z.string().min(10).max(10).optional(),
    password: z.string().min(6),
});

export const signinValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});