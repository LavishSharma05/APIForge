import { NextResponse,NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest){
    try{
        const authHeader=req.headers.get("authorization")

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }

        const token=authHeader.split(" ")[1];

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
                id: number;
            };
        }
        catch(err){
            console.log(err)
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
        

        const body=await req.json()

        const newHistory = await prisma.history.create({
            data: {
                method: body.method,
                url: body.url,
                headers: body.headers,
                bodyType: body.bodyType || null,
                requestBody: body.requestBody || null,
                userId: decoded.id,
            },
        });

        return NextResponse.json({message:"History Saved",history:newHistory},{status:201})
    }
    catch(err){
        console.log(err)
        return NextResponse.json(
            {error:"Internal Server Error"},
            {status:500}
        )
    }
}