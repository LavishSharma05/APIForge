import { NextResponse,NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken"

export async function DELETE(req:NextRequest){
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
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
        

        await prisma.history.deleteMany({
            where: { userId: decoded.id },
        });

        return NextResponse.json({ message: "User history cleared" }, { status: 200 });

    }
    catch(err){
        console.log(err)
        return NextResponse.json(
            {error:"Internal Server Error"},
            {status:500}
        )
    }
}