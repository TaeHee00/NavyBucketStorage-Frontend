export const bucketListAPI = async (accessToken: string) => {
    return await fetch("http://localhost:8080/api/v1/buckets", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `${accessToken}`,
        },
    }).then(async res => {
        const status = res.status;
        const data = await res.json();

        return {status, data};
    })
};

export const bucketFileListAPI = async (accessToken: string, bucketId: number)=> {
    return await fetch(`http://localhost:8080/api/v1/buckets/${bucketId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `${accessToken}`,
        }
    }).then(async res => {
        const status = res.status;
        const data = await res.json();

        return {status, data};
    })
}