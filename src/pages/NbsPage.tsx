import Header from "../components/nbs/Header";
import refresh from "../assets/images/refresh.png";
import React, {useEffect, useState} from "react";
import {
    ActiveBucketCountStyle,
    BucketCardContainerStyle, BucketContainerStyle, BucketTableStyle,
    BucketToolContainerStyle,
    CardTitleStyle, CheckBoxStyle, RefreshIconStyle, TableBodyStyle, TableRowStyle, ToolButtonStyle, ToolListStyle
} from "./NbsPage.css";
import {bucketListAPI} from "../services/bucket/BucketAPI";
import {useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

interface Bucket {
    id: number,
    bucketName: string,
    accessLevel: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}

const NbsPage = () => {
    const [checkedBucketList, setCheckedBucketList] = useState<number[]>([]);
    const [bucketList, setBucketList] = useState<Bucket[]>([]);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    useEffect(() => {
        bucketListAPI(queryClient.getQueryData(["accessToken"]) as string)
            .then((res) => {
                setBucketList(res.data)
            });
    }, []);

    const handleCheck = (key: number) => {

        setCheckedBucketList((prev) => {
            const filteringList = prev.filter((item) => item !== key);
            if (filteringList.length === prev.length) {
                return [...prev, key];
            }
            return filteringList;
        });
    }

    return (<>
        <Header username={"Admin"}/>
        <div className={BucketCardContainerStyle}>
            <div className={BucketToolContainerStyle}>
                <span className={CardTitleStyle}>범용 버킷 <span className={ActiveBucketCountStyle}>({1})</span></span>
                <div className={ToolListStyle}>
                    <button className={ToolButtonStyle}><img className={RefreshIconStyle} src={refresh} alt={""}/></button>
                    <button className={ToolButtonStyle}>ARN 복사</button>
                    <button className={ToolButtonStyle}>삭제</button>
                    <button className={ToolButtonStyle}>버킷 만들기</button>
                </div>
            </div>
            <table className={BucketTableStyle}>
                <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>이름</th>
                    <th>AWS 리전</th>
                    <th>IAM Access Analyzer</th>
                    <th>생성 날짜</th>
                </tr>
                <tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody className={TableBodyStyle}>
                    {bucketList.map((item) => (
                        <Bucket bucket={item} handler={handleCheck} key={item.id}
                                checked={checkedBucketList.includes(item.id)}
                                detailLink={() => {
                                    navigate("/nbs/bucket/detail", {
                                    state: {
                                        bucketId: item.id,
                                    }
                                })}}
                                />
                    ))}
                </tbody>
            </table>
        </div>
    </>);
}

const Bucket: React.FC<{ bucket: Bucket, handler: (key: number) => void, checked: boolean, detailLink: () => void }> = (props) => {
    // return (<tr className={props.checked ? BucketContainerStyle.checked : BucketContainerStyle.unchecked} onClick={() => props.handler(props.bucket.bucketId)}>
    return (<tr onClick={props.detailLink} className={props.checked ? BucketContainerStyle.checked : BucketContainerStyle.unchecked}>
        <td><input className={CheckBoxStyle} type="checkbox" checked={props.checked}/></td>
        <td>{props.bucket.bucketName}</td>
        <td>South Korea</td>
        <td>{props.bucket.description}</td>
        <td>{props.bucket.createdAt.toString()}</td>
    </tr>);
}

export default NbsPage;