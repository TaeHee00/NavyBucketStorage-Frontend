import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Button, Paper, Stack, TextField} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {bucketFileListAPI} from "../services/bucket/BucketAPI";
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
            <Button variant="outlined">Download</Button>
            <Button variant="outlined">Copy URL</Button>
            <Button variant="outlined">Delete</Button>
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
                sx={{ border: 0 }}
                // onCellDoubleClick={(params, event, details) => {console.log(params);}}
            />
        </Paper>
        DetailPage {bucketId}
    {/*   File 호출 하고 */}
    </>);
//             Long id,
//         String fileName,
//         String url,
//         long size,
//         LocalDateTime createdAt,
//         LocalDateTime updatedAt
};

export default NbsBucketDetailPage;