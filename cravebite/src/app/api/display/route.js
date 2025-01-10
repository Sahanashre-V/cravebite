import {a} from "@/app/utils/dbConnect"
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
      // Query the database
      const result = await a.query("SELECT * FROM student");
    //   console.log(result)
  
      // Return the result as JSON
      return NextResponse.json({ students: result.rows }, { status: 200 });
    } catch (error) {
      console.error("error:", error);
      return NextResponse.json(
        { message: "Error in getting details from database." },
        { status: 500 }
      );
    }
  }
