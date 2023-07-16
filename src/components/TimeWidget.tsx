import { observer } from "mobx-react"
import { Box } from "@mui/material";

interface ITimeWidget {
    attributes: any
    value: string
}

const TimeWidget = (props: ITimeWidget) => {
    const formatString = props.attributes['format'];
    const time = formatString === "date" 
        ? new Date(+props.value * 1000).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }) 
        : new Date(+props.value * 1000).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }) ;

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
            {time}
        </Box>
    )
}

export default observer(TimeWidget);