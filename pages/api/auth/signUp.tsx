import { PrismaClient } from "@prisma/client"
import {NextApiRequest, NextApiResponse} from "next"
import validator from "validator"
import bcrypt from "bcrypt"
import * as jose from "jose"

const prisma= new PrismaClient();

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="POST"){

        const {firstname,lastname,email,phone,city,password}=req.body
        const errors:string[]=[]

        const ValidationSchema=[
            {
                valid: validator.isLength(firstname,{
                    min:1,
                    max:20
                }),
                errormessage:"First name is invalid"
            },
            {
                valid: validator.isLength(lastname,{
                    min:1,
                    max:20
                }),
                errormessage:"Last name is invalid"
            },
            {
                valid:validator.isEmail(email),
                errormessage:"Email is invalid"
            },
            {
                valid:validator.isMobilePhone(phone),
                errormessage:"phone number is invalid"
            },
            {
                valid:validator.isLength(city,{min:1}),
                errormessage: "city is invalid"
            },
            {
                valid: validator.isStrongPassword(password),
                errormessage:"password is not strong enough"
            }
        ]

        ValidationSchema.forEach((check)=>{
            if(!check.valid){
                errors.push(check.errormessage)
            }
        });

        const user_check = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(user_check){
            return res.status(400).json({
                errormessage: "Email is already associated with the database"  
            });
        }

        

        const hashed_pass= await bcrypt.hash(password,10)

        const user= await prisma.user.create({
            data:{
                first_name:firstname,
                last_name:lastname,
                email:email,
                password:hashed_pass,
                phone:phone,
                city:city
            }
        })    

        if(errors.length>0){
            return res.status(400).json({
                errormessage: errors.map(error=>
                    error    
                )
            });
        }

        

        const key=new TextEncoder().encode(process.env.JWT_SECRET)

        const alg="HS256"
        const token= await new jose.SignJWT({email:user.email})
                                    .setProtectedHeader({alg})
                                    .setExpirationTime("24h")
                                    .sign(key)

        return res.status(200).json({
            hello:"User Created "+token
        })
    }

    return res.status(404).json({
        hello:"Unknown method"
    });
}