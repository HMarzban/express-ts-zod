import { z } from "zod";

// S: Schema
// T: Type
// I: Interface

export const SUserBody = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

export const SUserParams = z.object({
  id: z.string().uuid(),
});

export type TUser = z.infer<typeof SUserBody>;

export type TUserParams = z.infer<typeof SUserParams>;

export interface IUserBodyInput extends Omit<TUser, "age"> {
  age?: number;
}
