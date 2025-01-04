/*
//creating data base
await client.sql`CREATE TABLE IF NOT EXISTS todos(id SERIAL, task varchar(255))`//error throw [error: relation "todos" already exists] IF NOT EXISTS is not written
//inserting data
await client.sql`INSERT INTO todos(task) values('sleep')`
*/

import { NextRequest, NextResponse } from "next/server";
import { db,todoTable } from "@/app/lib/drizzle";
import { sql,eq, or } from "drizzle-orm";

export async function  GET(){
    
    try{
        
        await sql`CREATE TABLE IF NOT EXISTS todos(id SERIAL, task varchar(255))`//error throw [error: relation "todos" already exists] IF NOT EXISTS is not written
        
        const data = await db.select().from(todoTable).execute();
        return NextResponse.json({message : data});
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
            const {id}:{id:number}= await req.json()
            if(typeof(id)!= "number" || id<=0){
                return NextResponse.json({message : `invalid id`},{status:400})
            }
            const result = await db.delete(todoTable).where(eq(todoTable.id,id))
            if(result.rowCount==0){
                return(NextResponse.json({message:"task not found"},{status:404}))
            }

            return NextResponse.json({message : `${id} entry deleted`})
        }
        catch(error:any){
            return NextResponse.json({message: error.message},{status:500})
        }
        

        

}