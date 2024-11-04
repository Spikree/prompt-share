import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async (req) => {
    const { searchInput } = await req.json();

    if (!searchInput) {
        return new Response("Please enter a search input!!", { status: 400 });
    }

    try {
        await connectToDb();

        let response = await User.find({ username: searchInput }) 

        if(response.length === 0) {
            response = await Prompt.find({searchInput})
        }

        return new Response(JSON.stringify(response), {status:200})        

    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error block reached", { status: 500 });
    }
};
