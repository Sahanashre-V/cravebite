// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(request) {
//     const { req } = await request.json();  // Fetch request body correctly

//     console.log(req, "request")
//     try {
//         // Instantiate the GoogleGenerativeAI with the API key
//         const genAI = new GoogleGenerativeAI("AIzaSyAFIL-Su6IDqq2zLHQ13Po9jIK0qFI47NU");
        
//         // Fetch the model
//         const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         // Pass the prompt
//         const prompt = req;

//         // Generate content based on the prompt
//         const result = await model.generateContent(prompt);

//         console.log(result, "what is r")
        
//         // Access the response text
//         const generatedResult = result.response.text();

//         console.log(generatedResult, "is this a function")

//         // Return the generated result in the API response
//         return NextResponse.json({ message: generatedResult }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }



import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and preflight requests
                'Access-Control-Allow-Headers': 'Content-Type', // Allow required headers
            },
        });
    }

    const { req } = await request.json(); // Fetch request body correctly

    console.log(req, "request");

    try {
        // Instantiate the GoogleGenerativeAI with the API key
        const genAI = new GoogleGenerativeAI("AIzaSyAFIL-Su6IDqq2zLHQ13Po9jIK0qFI47NU");

        // Fetch the model
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Pass the prompt
        const prompt = req;

        // Generate content based on the prompt
        const result = await model.generateContent(prompt);

        console.log(result, "what is r");

        // Access the response text
        const generatedResult = result.response.text();

        console.log(generatedResult, "is this a function");

        // Return the generated result in the API response
        return new NextResponse(
            JSON.stringify({ message: generatedResult }),
            {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                    'Content-Type': 'application/json',
                },
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Internal server error" }),
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                status: 500,
            }
        );
    }
}
