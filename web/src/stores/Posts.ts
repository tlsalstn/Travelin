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

    @action remove = async (id: number) => {
        try {
            const result = await Axios({
                method: "DELETE",
                url: address.localhost + "/post/remove",
                params: {
                    id
                }
            });

            console.log(result);
            if(result.data.status) {
                alert("Success");
                window.location.href = "/mypage";
            } else {
                alert("Fail");
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action getMyPosts = async () => {
        try {
            const result = await Axios({
                method: "GET",
                url: address.localhost + "/post/getMyShare",
                headers: {
                    token: window.localStorage.getItem("token")
                }
            });

            console.log(result);
            if(result.data.status === 200) {
                this.posts = result.data.data;
            } else if(result.data.status === 401) {
                alert("Token expired");
                window.localStorage.clear();
                window.location.href = "/auth/login";
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action createPost = async (title: string, content: string, points: string) => {
        try {
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

            console.log(result);
            
            return result.data.status === 200
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}