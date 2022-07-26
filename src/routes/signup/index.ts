import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/database";
import validator from "validator";
import * as bcrypt from "bcrypt";
import * as cookie from "cookie";
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

    if (!validator.isEmail(email)){
        return {
            status: 400,
            body: {
                error: 'Please enter a valied email.'
            }
        }
    } 

    try {
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        //const refreshToken = createRefreshToken();
        let user = {
            email,
            password: passwordHash,
            refreshToken: ''
        };

        const createUser = await db.user.create({data: user });
        //console.log(createUser,"<==");
        if(createUser){
            //const token = createToken(createUser.id);
            return {
                status: 201,
                body: {
                    success: 'Success',
                    data: createUser
                },
                /* headers: {
                    'Set-Cookie': cookie.serialize('jwt', token, {
                        // send cookie for every page
                        path: '/',
                        // server side only cookie so you can't use `document.cookie`
                        httpOnly: true,
                        // only requests from same site can send cookies and serves to protect from CSRF
                        sameSite: 'strict',
                        // only sent over HTTPS
                        secure: process.env.NODE_ENV === 'production',
                        // set cookie to expire after a month
                        maxAge: maxAge * 30
                    }),
                    
                } */
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
        const errorMessage = handleErrors(error);
        return {
            status: 400,
            body: {
                error: errorMessage,
            }
        }
    }
    
    return {};
}