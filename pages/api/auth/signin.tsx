import { PrismaClient } from "@prisma/client"
import {NextApiRequest, NextApiResponse} from "next"
import validator from "validator"
import bcrypt from "bcrypt"
import * as jose from "jose"

const prisma= new PrismaClient();

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="POST"){

        const {email,password}=req.body
        const errors:string[]=[]

        const ValidationSchema=[
            
            {
                valid:validator.isEmail(email),
                errormessage:"Email is invalid"
            },
            {
                valid: validator.isLength(password,{min:1}),
                errormessage:"Invalid password"
            }
        ]

        ValidationSchema.forEach((check)=>{
            if(!check.valid){
                errors.push(check.errormessage)
            }
        });

        if(errors.length>0){
            return res.status(400).json({
                errormessage: errors.map(error=>
                    error    
                )
            });
        }


        const user_check = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!user_check){
            return res.status(401).json({
                errormessage: "Email or password is invalid"  
            });
        }
        
        const isMatch= await bcrypt.compare(password,user_check.password)

        if(!isMatch){
            return res.status(404).json("Wrong password!!!")  
        }

        const key=new TextEncoder().encode(process.env.JWT_SECRET)

        const alg="HS256"
        const token= await new jose.SignJWT({email:user_check.email})
                                    .setProtectedHeader({alg})
                                    .setExpirationTime("24h")
                                    .sign(key)

        return res.status(200).json({
            hello:"User found "+token
        })
    }

    return res.status(404).json({
        hello:"Unknown method"
    });
}