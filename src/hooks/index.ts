import { db } from "$lib/database";
import type { GetSession, Handle } from "@sveltejs/kit";
import * as cookie from 'cookie';
import { verify } from "jsonwebtoken";
import "dotenv/config";
import { createRefreshToken, maxAge, createAccessToken } from "$lib/jwt";

type JwtPayload = {
    id: number
}

export const handle: Handle =async ({ event, resolve }) => {
    /* const cookieHeader = event.request.headers.get('cookie');
    const cookies = cookie.parse(cookieHeader ?? ''); */
    //const { token, refresh_token } = cookie.parse(event.request.headers.get('cookie') || '');
    let setCookie: string = "";
   
    const { accessToken, refreshToken } = cookie.parse(event.request.headers.get('cookie') || '');
    const jwt_secret = process.env.JWT_SECRET || '';
    //console.log("token==>",token);
    if(accessToken){
        const user = verify(accessToken, jwt_secret) as JwtPayload;
        if(refreshToken){
            
            console.log("==1==");
             if (user){
                 const session = await db.user.findUnique({
                     where: { 
                        idRefreshToken: {
                            id: user.id, refreshToken: refreshToken
                        }
                      },
                     select: { id:true, email:true }
                 });
     
                 if(session){
                    console.log("==1==session==>",session);
                     event.locals.user = { id: session.id, email: session.email };
                 }
             }
        } else {
            console.log("==2==");
            if(user){
                const newRefreshToken = createRefreshToken();
                const updateUser = await db.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        refreshToken: newRefreshToken
                    },
                });

                if(updateUser){
                    event.locals.user = { id: updateUser.id, email: updateUser.email };
                    // newRefreshToken 을 cookie에 넣어줘야함
                    /* response.headers.set('Set-Cookie', cookie.serialize('refreshToken', newRefreshToken, {
                        // send cookie for every page
                        path: '/',
                        // server side only cookie so you can't use `document.cookie`
                        httpOnly: true,
                        // only requests from same site can send cookies and serves to protect from CSRF
                        sameSite: 'strict',
                        // only sent over HTTPS
                        secure: process.env.NODE_ENV === 'production',
                        // set cookie to expire after a month
                        maxAge: maxAge * 14
                    })); */
                    setCookie = cookie.serialize('refreshToken', newRefreshToken, {
                        // send cookie for every page
                        path: '/',
                        // server side only cookie so you can't use `document.cookie`
                        httpOnly: true,
                        // only requests from same site can send cookies and serves to protect from CSRF
                        sameSite: 'strict',
                        // only sent over HTTPS
                        secure: process.env.NODE_ENV === 'production',
                        // set cookie to expire after a month
                        maxAge: maxAge * 14
                    });
                }

            }
            
        }
        
        
    } else {
        if(refreshToken){
            console.log("==3==");
            const session = await db.user.findUnique({
                where: { refreshToken: refreshToken },
                select: { id:true, email:true }
            });

            if(session){
                const newAccessToken = createAccessToken(session.id, session.email);
                event.locals.user = { id: session.id, email: session.email };
                // newAccessToken 을 cookie에 넣어줘야함
                /* response.headers.set('Set-Cookie', cookie.serialize('accessToken', newAccessToken, {
                    // send cookie for every page
                    path: '/',
                    // server side only cookie so you can't use `document.cookie`
                    httpOnly: true,
                    // only requests from same site can send cookies and serves to protect from CSRF
                    sameSite: 'strict',
                    // only sent over HTTPS
                    secure: process.env.NODE_ENV === 'production',
                    // set cookie to expire after a month
                    maxAge: maxAge * 14
                })); */
                setCookie = cookie.serialize('accessToken', newAccessToken, {
                    // send cookie for every page
                    path: '/',
                    // server side only cookie so you can't use `document.cookie`
                    httpOnly: true,
                    // only requests from same site can send cookies and serves to protect from CSRF
                    sameSite: 'strict',
                    // only sent over HTTPS
                    secure: process.env.NODE_ENV === 'production',
                    // set cookie to expire after a month
                    maxAge: maxAge * 14
                });
            }
            
        }
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
    console.log("==return==");
    //event.locals.user = { id: 9999, email: "email@email.email" };
    console.log("==return==>",event.locals);
    const response = await resolve(event);
    response.headers.set('Set-Cookie', setCookie);
    return response;
    
}

export const getSession: GetSession = ({ locals }) => {
    console.log("getSession==>",locals);
    if (!locals.user) return {}

    return {
        user: {
            id: locals.user.id,
            email: locals.user.email,
        }
    }
}