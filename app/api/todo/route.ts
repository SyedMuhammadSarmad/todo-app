/*
//creating data base
await client.sql`CREATE TABLE IF NOT EXISTS todos(id SERIAL, task varchar(255))`//error throw [error: relation "todos" already exists] IF NOT EXISTS is not written
//inserting data
await client.sql`INSERT INTO todos(task) values('sleep')`
*/

import { NextRequest, NextResponse } from "next/server";
import { db,todoTable } from "@/app/lib/drizzle";
import { sql,eq } from "drizzle-orm";

export async function  GET(){
    
    try{
        
        await sql`CREATE TABLE IF NOT EXISTS todos(id SERIAL, task varchar(255))`//error throw [error: relation "todos" already exists] IF NOT EXISTS is not written
        
        const data = await db.select().from(todoTable).execute();
        return NextResponse.json({messsage : data});
    }
    catch(error){
        return NextResponse.json({message:"error"}) //json
        //return new NextResponse("something wrong") //text message

    }
}

export async function  POST(req:NextRequest){
    const data:{task:string} = await req.json()
    try{
        if(data.task){
            await db.insert(todoTable).values({     task : data.task    })
            return NextResponse.json({message : `${data.task} task added`})
        }
        else{
            throw new Error("Task field is missing or undefine task")
        }
    }
    catch(error:any){

        return NextResponse.json({message: error.message});
    } 

}

export async function DELETE(req:NextRequest){
        try{
            const data:{task:string} = await req.json()
            await db.delete(todoTable).where(eq(todoTable.task,data.task))
            return NextResponse.json({message : `${data.task} entry deleted`})
        }
        catch(error:any){
            return NextResponse.json({message: error.message})
        }
        

        

}