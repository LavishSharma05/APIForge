import { NextResponse,NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken"

export async function GET(req:NextRequest){
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
            console.error(err)
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
        

        const history=await prisma.history.findMany({
            where:{userId:decoded.id},
            orderBy:{timestamp:"desc"}
        })

        return NextResponse.json({history},{status:201})
    }
    catch(error){
        console.error(error)
        return NextResponse.json(
            {error:"Internal Server Error"},
            {status:500}
        )
    }
}