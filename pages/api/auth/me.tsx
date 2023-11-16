import { PrismaClient } from "@prisma/client"
import {NextApiRequest, NextApiResponse} from "next"
import validator from "validator"
import bcrypt from "bcrypt"
import * as jose from "jose"
import { json } from "stream/consumers"

const prisma= new PrismaClient();

export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const bearer= req.headers["authorization"] as string;

    if(!bearer){
        return res.status(400).json({errorMessage:"unauthorized request"});
    }

    const token= bearer.split(" ")[1]

    if(!token){ 
        return res.status(400).json({errorMessage:"unauthorized token"});
    }

    const key=new TextEncoder().encode(process.env.JWT_SECRET)
    
    try {
       await jose.jwtVerify(token,key);
    } catch (error) {
        return res.status(400).json({errorMessage:"invalid token"});
    }

    const payload= jose.decodeJwt(token) as {email:string}

    if(!payload['email']){
        return res.status(400).json({errorMessage:"unauthorized request"});
    }
    // console.log(payload)

    const user= await prisma.user.findUnique({
        where:{
            email:payload['email']
        },
        select:{
            id:true,
            first_name:true,
            last_name:true,
            email:true,
            phone:true,
            city:true,
        }
    })
    return res.status(200).json({user: user});
}