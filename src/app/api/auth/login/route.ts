import { NextResponse } from "next/server";
import {  z } from "zod/v4";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";


const loginSchema=z.object({
    email:z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(req:Request){
    try{
        const body=await req.json()
        const parsedData=loginSchema.safeParse(body)

        if(!parsedData.success){
            return(NextResponse.json(
                {error:parsedData.error.flatten().fieldErrors},
                {status:400}
            ))
        }

        const {email,password}=parsedData.data

        const existingUser=await prisma.user.findUnique({
            where:{email}
        })

        if(!existingUser){
            return(NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            ))
        }

        const isPasswordValid=await bcrypt.compare(password,existingUser.password)

        if(!isPasswordValid){
            return(NextResponse.json(
                {error:"Invalid email or password"},
                {status:401}
            ))
        }

        const token=jwt.sign(
            {
                id:existingUser.id,
                email:existingUser.email,
                name:existingUser.name
            },
            process.env.JWT_SECRET as string,
            {expiresIn:"7d"}
        )
        

        return NextResponse.json(
        {
            message: "Login successful",
            token,
            user: {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            },
        },
        { status: 200 }
        );
    }
    catch(err){
        console.error("Login Error:", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}