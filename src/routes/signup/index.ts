import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/database";
import validator from "validator";
import * as bcrypt from "bcrypt";
import { handleErrors } from "$lib/handle_error";

//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();

export const post: RequestHandler =async ({request}) => {
    const jsonData = await request.json();
    const username = jsonData.username;
    const password = jsonData.password;

    if (!validator.isEmail(username)){
        return {
            status: 400,
            body: {
                error: 'Please enter a valied email.'
            }
        }
    }

    if (typeof username !== 'string' || typeof password !== 'string'){
        return {
            status: 400,
            body: {
                error: 'Something went wrong.'
            }
        }
    }

    if (!username || !password){
        return {
            status: 400,
            body: {
                error: 'Username and Password is required.'
            }
        }
    }
    try {
         
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        let user = {
            username,
            password: passwordHash
        };

        const createUser = await db.user.create({data: user });
        console.log(createUser,"<==");
        if(createUser){
            return {
                status: 201,
                body: {
                    success: 'Success',
                    data: createUser
                }
            }
        } else {
            console.log("Exist user");
            return {
                status: 400,
                body: {
                    error: 'User is already exist.',
                }
            }
        }
        
    } catch (error) {
        handleErrors(error);
        return {
            status: 400,
            body: {
                error: 'Error',
            }
        }
    }
    
    return {};
}