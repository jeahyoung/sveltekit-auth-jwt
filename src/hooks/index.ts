import { db } from "$lib/database";
import type { GetSession, Handle } from "@sveltejs/kit";
import * as cookie from 'cookie';
import { verify } from "jsonwebtoken";

type JwtPayload = {
    id: number
}

export const handle: Handle =async ({ event, resolve }) => {
    /* const cookieHeader = event.request.headers.get('cookie');
    const cookies = cookie.parse(cookieHeader ?? ''); */
    //const { token, refresh_token } = cookie.parse(event.request.headers.get('cookie') || '');

    const { token } = cookie.parse(event.request.headers.get('cookie') || '');

    //console.log("token==>",token);
    if(token){
        const user = verify(token, 'secret_key') as JwtPayload;
       //console.log("user==>",user);
        if (user){
            const session = await db.user.findUnique({
                where: { id: user.id },
            });

            if(session){
                event.locals.user = { id: session.id, email: session.email };
            }
        }
        
    }else{
        return await resolve(event);
    }
    

    /* if (!cookies.session){
        return await resolve(event);
    }

    const session = await db.user.findUnique({
        where: { id: cookies.session },
    })

    if (session) {
        event.locals = { username: session.username }
    }
 */

    return await resolve(event);
   
}

export const getSession: GetSession = ({ locals }) => {
    if (!locals.user) return {}

    return {
        user: {
            id: locals.user.id,
            email: locals.user.email,
        }
    }
}