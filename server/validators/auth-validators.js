import z from "zod";

export const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" }),
    
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email format" }),
    
    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 characters long" })
        .max(15, { message: "Phone number must be at most 15 characters long" }),
    
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be at most 50 characters long" }),
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email format" }),

        password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be at most 50 characters long" }),
});
