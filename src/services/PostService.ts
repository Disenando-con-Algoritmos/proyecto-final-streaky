const getPost = async () => {
    const res = await fetch("/data/post.json");
    const data = await res.json();

    return data;
};

export { getPost };
