import type { RequestHandler } from "@sveltejs/kit";

import { db } from "$lib/database";

export const post: RequestHandler =async ({request}) => {
    const jsonData = await request.json();
    const username = jsonData.username;
    const password = jsonData.password;

    console.log(username,"==",password);
    try {
         
        let user = {
            username,
            password
        };

        const createUser = await db.user.create({data: user });
        console.log(createUser,"<==");
        return {
            status: 201,
            body: {
                success: 'Success',
                data: createUser
            }
        }
    } catch (error) {
        return {
            status: 400,
            body: {
                success: 'Error',
            }
        }
    }
    
}