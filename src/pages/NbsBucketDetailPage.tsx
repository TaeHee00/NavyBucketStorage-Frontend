import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Paper,
    Stack,
    styled,
    TextField,
    Typography
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {bucketFileDeleteAPI, bucketFileListAPI, bucketFilesUploadAPI} from "../services/bucket/BucketAPI";
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

export interface File {
    id: number;
    fileName: string;
    url: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
}

const formatFileSize = (sizeInBytes: number)=> {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    let size = sizeInBytes;

    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
}

const columns: GridColDef[] = [
    { field: 'fileName', headerName: 'Name', width: 300 },
    // { field: 'type', headerName: 'Type', width: 130 }, 파일 타입
    { field: 'updatedAt', headerName: 'Last modified', width: 230 },
    { field: 'size', headerName: 'Size', width: 90,
        valueGetter: (value, row) => `${formatFileSize(value)}` , },
];
const paginationModel = { page: 0, pageSize: 5 };
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const NbsBucketDetailPage = () => {
    const { id } = useParams();
    const [bucketId, setBucketId] = useState<number>(parseInt(String(id)));
    const [open, setOpen] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
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
            <Button style={{ textTransform: 'none' }} variant="outlined" disabled={selectedFiles.length === 0} onClick={() => {
                if (!bucket) return;
                downloadFiles(bucket.files.filter((file) => selectedFiles.includes(file.id)));
            }}>Download</Button>
            <Button style={{ textTransform: 'none' }} variant="outlined" disabled={selectedFiles.length !== 1} onClick={() => {
                const file = bucket?.files.find((item) => item.id === selectedFiles[0]);
                if (!file) return;
                copyUrl(`http://localhost:8080/api/v1/files/${file.url}`)
            }}>Copy URL</Button>
            <Button style={{ textTransform: 'none' }} variant="outlined" disabled={selectedFiles.length === 0} onClick={() => {
                const files = bucket?.files.filter((file) => selectedFiles.includes(file.id));
                if (!files) return;
                const flag = confirm(`삭제하실 경우 파일을 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?\n\n삭제할 파일 목록: ${files.map(file => file.fileName).join(",\n                          ")}`);
                if (flag) {
                    deleteFiles(files);
                    alert("삭제되었습니다.");
                }
            }}>Delete</Button>
            <Button style={{ textTransform: 'none' }}
                    component="label"
                    tabIndex={-1}
                    variant="contained">
                Upload
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                        if (!event.target.files) return;
                        const fileNames = Array.from(event.target.files).map(file => file.name).join('\n');
                        const message = `다음 파일들을 업로드하시겠습니까?\n\n${fileNames}`;

                        if (confirm(message)) {
                            setOpen(true);
                            setProgress(0);

                            const xhr = new XMLHttpRequest();
                            const formData = new FormData();
                            formData.append('bucketId', bucketId.toString());
                            for (let i = 0; i < event.target.files.length; i++) {
                                formData.append('files', event.target.files[i]);
                            }

                            xhr.upload.addEventListener('progress', (event) => {
                                if (event.lengthComputable) {
                                    const percentComplete = (event.loaded / event.total) * 100;
                                    setProgress(percentComplete);
                                }
                            });

                            xhr.onload = () => {
                                if (xhr.status === 201) {
                                    console.log("Upload complete");
                                    setTimeout(() => setOpen(false), 1000);
                                } else {
                                    console.error("Upload failed");
                                }
                            };

                            xhr.open("POST", "http://localhost:8080/api/v1/files", true);
                            xhr.setRequestHeader("Authorization", getCookie("accessToken"));
                            xhr.send(formData);

    //                         const response = await bucketFilesUploadAPI(getCookie("accessToken"), formData);
    //                         alert(`업로드 성공 파일 개수: ${response.successedFileList.length}\n
    // 업로드 실패 파일 개수: ${response.failedFileList.length}`);

                            // uploadFiles(bucketId, event.target.files).then((res) => {
                            //
                            // });
                        }
                    }}
                    multiple
                />
            </Button>
            <Button style={{ textTransform: 'none' }}
                    variant="outlined"
                    onClick={() => {
                        bucketFileListAPI(getCookie("accessToken"), bucketId)
                            .then((res) => {
                                setBucket(res.data as BucketData);
                            });
                    }}>Refresh</Button>
        </Stack>
        <TextField id="search-file-name" label="파일 이름 검색" variant="outlined" fullWidth/>

        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Uploading Files</DialogTitle>
            <DialogContent>
                <Typography variant="body1">진행률</Typography>
                {progress > 100 ? (<>
                    <LinearProgress variant="determinate" value={progress}/><Typography
                    variant="body2">{`${Math.round(progress)}%`}</Typography>
                </>) : (
                    <Typography variant="body2">서버 업로드 중</Typography>
                )}
            </DialogContent>
        </Dialog>

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

const uploadFiles = async (bucketId: number, files: FileList) => {
    const formData = new FormData();
    formData.append('bucketId', bucketId.toString()); // bucketId는 상태나 props로 관리

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    const response = await bucketFilesUploadAPI(getCookie("accessToken"), formData);
    alert(`업로드 성공 파일 개수: ${response.successedFileList.length}\n
    업로드 실패 파일 개수: ${response.failedFileList.length}`);

};

export default NbsBucketDetailPage;