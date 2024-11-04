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

        const userQuery = { username: searchInput };
        const promptQuery = { $or: [{ prompt: searchInput }, { tag: searchInput }] };

        let response = await User.findOne(userQuery, '-email');

        if (!response) {
            response = await Prompt.findOne(promptQuery).populate('creator', '-email');
        }

        if (response) {
            return new Response(JSON.stringify(response), { status: 200 });
        } else {
            return new Response("No matching document found", { status: 404 });
        }

    } catch (error) {
        console.error("Error in search:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
