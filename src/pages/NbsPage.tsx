import Header from "../components/nbs/Header";
import refresh from "../assets/images/refresh.png";
import React, {useState} from "react";
import {
    ActiveBucketCountStyle,
    BucketCardContainerStyle, BucketContainerStyle, BucketTableStyle,
    BucketToolContainerStyle,
    CardTitleStyle, CheckBoxStyle, RefreshIconStyle, TableBodyStyle, TableRowStyle, ToolButtonStyle, ToolListStyle
} from "./NbsPage.css";

const NbsPage = () => {
    const [checkedBucketList, setCheckedBucketList] = useState<number[]>([]);

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
                <tr className={TableRowStyle.default}>
                    <th>&nbsp;</th>
                    <th>이름</th>
                    <th>AWS 리전</th>
                    <th>IAM Access Analyzer</th>
                    <th>생성 날짜</th>
                </tr>
                <tr className={TableRowStyle.spacer}>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody className={TableBodyStyle}>
                    {bucketItems.map((item) => (
                        <Bucket bucket={item} handler={handleCheck} key={item.id}
                                checked={checkedBucketList.includes(item.id)}/>
                    ))}
                </tbody>
            </table>
        </div>
    </>);
}

const bucketItems = [
    {
        id: 1,
        name: "navy-cloud",
        legion: "South Korea",
        iam: "분석기",
        createdAt: "2024-11-30 10:20:30",
    }, {
        id: 2,
        name: "test",
        legion: "South Korea",
        iam: "분석기",
        createdAt: "2024-11-30 10:20:30",
    }, {
        id: 3,
        name: "s3",
        legion: "South Korea",
        iam: "분석기",
        createdAt: "2024-11-30 10:20:30",
    },
]

interface BucketItem {
    id: number;
    name: string;
    legion: string;
    iam: string;
    createdAt: string;
}

const Bucket: React.FC<{ bucket: BucketItem, handler: (key: number) => void, checked: boolean }> = (props) => {
    return (<tr className={props.checked ? BucketContainerStyle.checked : BucketContainerStyle.unchecked} onClick={() => props.handler(props.bucket.id)}>
        <td><input className={CheckBoxStyle} type="checkbox" checked={props.checked}/></td>
        <td>{props.bucket.name}</td>
        <td>{props.bucket.legion}</td>
        <td>{props.bucket.iam}</td>
        <td>{props.bucket.createdAt}</td>
    </tr>);
}

export default NbsPage;