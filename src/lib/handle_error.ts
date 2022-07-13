import { Prisma } from "@prisma/client";

export const handleErrors = (err: any) => {
    if(err instanceof Prisma.PrismaClientKnownRequestError){
        if (err.code === 'P2002'){
            console.log('There is a unique constraint violation, a new user cannot be created with this email');
        }
    }
}