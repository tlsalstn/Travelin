import axios from "axios";

export async function getPost(): Promise<Post> {
    const response: Post = await axios({
        method: "GET",
        url: "https://community-open-weather-map.p.rapidapi.com/weather",
        headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "70192c2743mshfa8350bd35a0a94p1d30f0jsn209d7455a07b"
        },
        params: {
            q: "paris"
        }
    });

    console.log(response.data);
    return response.data;
}

export interface Post {
    data: any;
}