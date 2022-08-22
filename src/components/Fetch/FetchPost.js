
export const FetchPost = () => {
    const GetPosts = async (url, token, method) => {
        const response = await fetch(url, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        }); 

        const data = await response.json();

        return { data, response };
    }
    
    const CreatePost = async (url, token, method, postData) => {
        const response = await fetch(url, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData)
        });
        
        const data = await response.json();
        
        return { data, response };
    }

    return { GetPosts, CreatePost };

}


