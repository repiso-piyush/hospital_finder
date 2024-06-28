
import { z } from 'zod'

export const UserCreateInput = z.object({
    email: z.string().email(),
    password:z.string(),
    firstName:z.string().max(20),
    lastName:z.string().max(20),
})

