import { NextResponse } from "next/server";
import { a } from "@/app/utils/dbConnect";

export async function PUT(request, { params }) {
  const { id } = await params; 
  const body = await request.json();

  try {
    const { fname, lname } = body;
    const result = await a.query(
      "UPDATE student SET fname = $1, lname = $2 WHERE student_id = $3",
      [fname, lname, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { message: "Error updating student in the database." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params; 

  if (!id) {
    return NextResponse.json(
      { message: "Invalid or missing ID." },
      { status: 400 }
    );
  }

  try {
    const result = await a.query(
      "DELETE FROM student WHERE student_id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { message: "Error deleting student from the database." },
      { status: 500 }
    );
  }
}
