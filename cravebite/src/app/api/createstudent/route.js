import {a} from "@/app/utils/dbConnect"
import { NextResponse } from "next/server";

console.log(a, "what is a")

export async function POST(request) {
  try {
    const body = await request.json(); // Parse the JSON body from the request
    const { Fname, Lname } = body;

    if (!Fname || !Lname ) {
      return NextResponse.json(
        { message: "First Name, and Last Name are required." },
        { status: 400 }
      );
    }

    // Insert the student data into the database
    const result = await a.query(
      "INSERT INTO student (Fname, Lname) VALUES ($1, $2) RETURNING Fname, Lname",
      [Fname, Lname]
    );

    // Respond with the created student details
    console.log(result)
    return NextResponse.json({ student: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Error adding student to the database." }, { status: 500 });
  }
}
