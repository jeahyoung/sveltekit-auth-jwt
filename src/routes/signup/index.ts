import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/database";
import validator from "validator";
import * as bcrypt from "bcrypt";
import { handleErrors } from "$lib/handle_error";

//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();

export const post: RequestHandler =async ({request}) => {
    // const jsonData = await request.json();
    // console.log("jsonData==>", jsonData);
    // const email = jsonData.email;
    // const password = jsonData.password;

    const formData = await request.formData();
    console.log("formData==>",formData);
    const email = formData.get('email');
    const password = formData.get('password');
    

    

    if (typeof email !== 'string' || typeof password !== 'string'){
        return {
            status: 400,
            body: {
                error: 'Something went wrong.'
            }
        }
    }

    if (!email || !password){
        return {
            status: 400,
            body: {
                error: 'email and Password is required.'
            }
        }
    }
    try {
         
        if (!validator.isEmail(email)){
            return {
                status: 400,
                body: {
                    error: 'Please enter a valied email.'
                }
            }
        } 
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        let user = {
            email,
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