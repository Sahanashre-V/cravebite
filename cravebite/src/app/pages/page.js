"use client";
import axios from "axios";

export default function Home() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const Fname = formData.get("Fname");
    const Lname = formData.get("Lname");

    try {
      const response = await fetch("/api/createstudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Fname, Lname }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(
          `Student added: ID ${ID}, Name: ${result.student.Fname} ${result.student.Lname}`
        );
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // const handleClick = () => {
  //   const updateData = axios.put("/api/update",{
  //     headers: {"Content-Type": "application/json"},
  //     params: 
  //   })
  // }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Student Management</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="Fname"
          type="text"
          placeholder="First Name"
          required
          className="border p-2 rounded"
        />
        <input
          name="Lname"
          type="text"
          placeholder="Last Name"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </form>
      {/* <button onClick={handleClick}>Edit</button> */}
    </div>
  );
}
