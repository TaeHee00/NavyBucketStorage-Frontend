import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const NbsBucketDetailPage = () => {
    const location = useLocation();

    const [bucketId, setBucketId] = useState(
        location.state?.bucketId
    );

    return (<>
        DetailPage {bucketId}
    </>);
};

export default NbsBucketDetailPage;