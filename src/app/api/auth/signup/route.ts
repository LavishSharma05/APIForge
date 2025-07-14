import { NextResponse } from "next/server";
import { z } from "zod/v4";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma";



const signUpSchema=z.object({
    name: z.string().min(1,"Name is Required"),
    email:z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(req:Request){
    try{
        const body=await req.json()
        const parsedData=signUpSchema.safeParse(body)

        if(!parsedData.success){
            return NextResponse.json(
                {error:parsedData.error.flatten().fieldErrors},
                {status:400}
            )
        }

        const {name,email,password}=parsedData.data

        const existingUser=await prisma.user.findUnique({
            where:{email}
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })

        return NextResponse.json(
            { message: "User created successfully", user: { id: newUser.id, email: newUser.email } },
            { status: 201 }
        );
    }

    catch(error){
        console.error("Signup Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}