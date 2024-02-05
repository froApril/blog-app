import useData from "./useData";

export interface Post {
    _id: string;
    title: string;
    desc: string;
    img: string;
    userImg: string;
    username: string;
    date: string;
    cat: string;
}

const usePosts = (cat: string | null) => useData<Post>('/api/post/' + cat, undefined, [cat]);

export default usePosts;