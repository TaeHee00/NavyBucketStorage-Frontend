import {File} from "../../pages/NbsBucketDetailPage";

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
};

export const bucketFileDeleteAPI = async (accessToken: string, fileId: number)=> {
    return await fetch(`http://localhost:8080/api/v1/files/${fileId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `${accessToken}`,
        }
    }).then(async res => {
        if (res.status !== 204) {
            alert("권한 오류 발생");
        }
        return res.status;
    })
};

export const bucketFilesUploadAPI = async (accessToken: string, formData: FormData): Promise<FileUploadResponse> => {
    return await fetch(`http://localhost:8080/api/v1/files`, {
        method: "POST",
        headers: {
            "Authorization": `${accessToken}`,
            credentials: 'include',
        },
        body: formData,
    }).then(async res => {
        if (res.status !== 201) {
            alert("권한 오류 발생");
        }
        const data = await res.json();
        return data as FileUploadResponse;
    })
}

interface FileUploadResponse {
    bucket: Map<string, string>;
    successedFileList: File[];
    failedFileList: string[];
}