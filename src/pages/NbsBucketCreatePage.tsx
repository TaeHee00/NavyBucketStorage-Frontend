import Header from "../components/nbs/Header";
import {CardContainerStyle} from "./LoginPage.css";
import React, {useState} from "react";
import {
    Button,
    FormControl, FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem, Radio,
    RadioGroup,
    Select,
    SelectChangeEvent, Stack,
    TextField
} from "@mui/material";

const NbsBucketCreatePage = () => {
    const [legion, setLegion] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setLegion(event.target.value as string);
    };

    return (<>
        <Header username={"Admin"} />
        {/* Bucket name, Access Level, Description */}
        <div className={CardContainerStyle.default}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Legion</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={legion}
                    label="Legion"
                    onChange={handleChange}
                >
                    {legions.map((_legion) => <MenuItem key={_legion.key} value={_legion.key}>{_legion.label}</MenuItem>)}
                </Select>
            </FormControl>

            <TextField id="outlined-basic" label="버킷 이름" variant="outlined" fullWidth />

            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Access Level</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                </RadioGroup>
            </FormControl>

            <TextField
                id="filled-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="filled"
                fullWidth
            />
            <Stack spacing={2} direction="row">
                <Button variant="outlined">취소</Button>
                <Button variant="contained">버킷 생성</Button>
            </Stack>
        </div>
    </>);
}

export const legions = [
    { key: "아시아 태평양(서울) ap-southease-2a", label: "아시아 태평양(서울) ap-southease-2a" }
]

export default NbsBucketCreatePage;