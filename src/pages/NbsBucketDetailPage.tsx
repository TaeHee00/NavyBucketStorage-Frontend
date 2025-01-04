import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Button, Paper, Stack, TextField} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {bucketFileDeleteAPI, bucketFileListAPI} from "../services/bucket/BucketAPI";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "../util/Cookie";

interface BucketData {
    id: number;
    bucketName: string;
    accessLevel: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    files: File[];
}

interface File {
    id: number;
    fileName: string;
    url: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
}

const columns: GridColDef[] = [
    { field: 'fileName', headerName: 'Name', width: 300 },
    // { field: 'type', headerName: 'Type', width: 130 }, 파일 타입
    { field: 'updatedAt', headerName: 'Last modified', width: 230 },
    { field: 'size', headerName: 'Size', width: 90,
        valueGetter: (value, row) => `${parseInt(String(value / 1024))} KB`, },
];
const paginationModel = { page: 0, pageSize: 5 };

const NbsBucketDetailPage = () => {
    const { id } = useParams();
    const [bucketId, setBucketId] = useState<number>(parseInt(String(id)));
    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const [bucket, setBucket] = useState<BucketData>();

    useEffect(() => {
        bucketFileListAPI(getCookie("accessToken"), bucketId)
            .then((res) => {
                setBucket(res.data as BucketData);
            });
    }, []);

    return (<>
        <h2>{bucket?.bucketName}</h2>

        <Stack spacing={2} direction="row">
            <Button variant="outlined" disabled={selectedFiles.length === 0} onClick={() => {
                if (!bucket) return;
                downloadFiles(bucket.files.filter((file) => selectedFiles.includes(file.id)));
            }}>Download</Button>
            <Button variant="outlined" disabled={selectedFiles.length !== 1} onClick={() => {
                const file = bucket?.files.find((item) => item.id === selectedFiles[0]);
                if (!file) return;
                copyUrl(`http://localhost:8080/api/v1/files/${file.url}`)
            }}>Copy URL</Button>
            <Button variant="outlined" disabled={selectedFiles.length === 0} onClick={() => {
                const files = bucket?.files.filter((file) => selectedFiles.includes(file.id));
                if (!files) return;
                const flag = confirm(`삭제하실 경우 파일을 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?\n\n삭제할 파일 목록: ${files.map(file => file.fileName).join(",\n                          ")}`);
                if (flag) {
                    deleteFiles(files);
                }
            }}>Delete</Button>
            <Button variant="contained">Upload</Button>
        </Stack>
        <TextField id="search-file-name" label="파일 이름 검색" variant="outlined" fullWidth/>


        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={bucket?.files}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={(rowSelectionModel, details) => {
                    setSelectedFiles(rowSelectionModel.map((num) => parseInt(String(num))));
                }}
                sx={{ border: 0 }}
                // onCellDoubleClick={(params, event, details) => {console.log(params);}}
            />
        </Paper>
    </>);
};

const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
        alert("복사하였습니다.");
    }).catch(err => {
        console.error("failed to copy: ", err);
    })
}

const downloadFiles = (files: File[]) => {
    files.forEach((file, index) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = `http://localhost:8080/api/v1/files/${file.url}`;
            link.download = file.fileName || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, index * 100); // 각 파일 다운로드 사이에 1초 간격
    });
};

const deleteFiles = (files: File[]) => {
    files.forEach((file) => bucketFileDeleteAPI(getCookie("accessToken"), file.id));
};

export default NbsBucketDetailPage;