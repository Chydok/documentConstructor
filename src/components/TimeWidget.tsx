import { observer } from "mobx-react"
import { Box } from "@mui/material";
import {timeFormat} from "./constructorToolbar/ConstructorToolbar"

interface ITimeWidget {
    attributes: any
    formatString: string
}

const TimeWidget = (props: ITimeWidget) => {
    const formatString = timeFormat();
    if (formatString === "date") {
        var now = new Date().toLocaleString().slice(0, -10);
    } else {
        var now = new Date().toLocaleString();
    }
    return (
        <Box
            sx={{
                width: 60,
                height: 60,
                backgroundColor: 'transparent',
                '&:hover': {
                backgroundColor: 'transparent',
                opacity: [0.9, 0.8, 0.7],
                },
            }}
            
        >
            {now}
        </Box>
    )
}

export default observer(TimeWidget);