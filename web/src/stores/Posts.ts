import { observable, action } from "mobx";
import Axios from "axios";
import { address } from "../config/adrs.json";

interface Post {
    id: number;
    userId: string;
    title: string;
    content: string;
    created: string;
    points: string;
}

export class PostStore {
    @observable post: Post = {
        id: 0,
        userId: "",
        title: "",
        content: "",
        created: "",
        points: "{}"
    };
    @observable posts: Post[] = [];

    @action setPost = (post: Post) => this.post = post;

    @action setPosts = (posts: Post[]) => this.posts = posts;

    @action getPost = async (id: number) => {
        if (!id) {
            const result = await Axios({
                method: "GET",
                url: address.localhost + "/post/getShare"
            });

            console.log(result);

            if (result.data.status === 200) {
                this.setPosts(result.data.data[0]);

                return this.posts;
            }
        } else {
            const result = await Axios({
                method: "GET",
                url: address.localhost + "/post/getShare",
                params: {
                    id
                }
            });

            if (result.data.status === 200) {
                this.setPost(result.data.data[0]);

                return this.post;
            }
        }
    }

    @action createPost = async (title: string, content: string, points: string) => {
        const result = await Axios({
            method: "POST",
            url: address.localhost + "/post/createShare",
            headers: {
                token: window.localStorage.getItem("token")
            },
            data: {
                title,
                content,
                points
            }
        });
        
        if(result.data.data.status === 200) return true;
        return false;
    }
}