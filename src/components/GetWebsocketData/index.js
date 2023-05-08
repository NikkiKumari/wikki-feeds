import React, {useEffect, useState, useRef} from 'react';
import { Box, Grid, Paper, Button } from "@mui/material";
import ActionCount from '../ActionCount'
import Message from '../ActivityFeed';
import GeoChart from '../GeoChart';



const GetWebsocketData = () => {
    const [data, setData] = useState([])
    const [actions, setActions] = useState({})
    const [startTime, setStartTime] = useState('')
    const [isPaused, setPause] = useState(false);
    const [country, setCountry] = useState(null);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [countryCount, setCountryCount] = useState({});
    const ws = useRef(null);

    // using this ref to get height and width for geochart to resize. 
    const chartRef = useRef(null)

    // connnect to webhook [ws://wikimon.hatnote.com:9000]
    const connectToWebHook = () => {
        ws.current = new WebSocket("ws://wikimon.hatnote.com:9000");
        ws.current.onopen = () => {
            setStartTime(new Date().toLocaleTimeString())
            console.log("ws opened")
        };
        ws.current.onclose = () => console.log("ws closed");
    }

    // connect to webhook on component mount
    useEffect(() => {
        connectToWebHook();
        const wsCurrent = ws.current;
        if (chartRef.current) {
            setHeight(chartRef.current.offsetHeight)
            setWidth(chartRef.current.offsetWidth)
        }
        return () => {
            wsCurrent.close();
        };
    }, []);

    // update child component onmessage
    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            const allActions = {...actions}
            const country_name = message?.geo_ip?.country_name
            if(country_name){
                countryCount[country_name] = countryCount[country_name] ? countryCount[country_name] + 1 : 1
                setCountryCount(countryCount)
            } 
            setCountry(country_name) 
            allActions[message.action] = allActions[message.action] ? allActions[message.action]+1 : 1
            setActions(allActions)
            data?.length > 200 ? setData(data.slice(-5)): setData([...data, message])
        };
        }, [data, actions, isPaused, countryCount, country]);

    const disconnectWebhook = () => {
        if(isPaused){
            connectToWebHook()
        }else{
            ws.current.close();
        }
        setPause(!isPaused)
    }
    
    return (
        <React.Fragment>
            <Box className='main'>
            <div className="container">
                <header className="header">Wikipedia Monitor</header>
                <span className='span'>
                    Start Time: {startTime}
                    <Button size="small" variant="outlined" className='disconnect' onClick={()=>disconnectWebhook()}>{isPaused? 'Connect' : 'Disconnect'}</Button>
                </span>
            </div>
            <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ height: "100%" }}
            >
                <Grid item xs={7}>
                <fieldset className='field-set'>
                    <legend>Activity Feed</legend>
                    <Paper variant="outlined" className="paper">
                            {
                                data && data.map(d => <Message 
                                    key={`${d.rev_id}${d.user}`}
                                    message={d.summary}
                                    displayName={d.user}
                                    location={d.page_title}
                                    action={d.action}
                                    url={d.url}
                                />)
                            }
                    </Paper>
                    </fieldset>
                </Grid>
                <Grid item xs={3}>
                <fieldset className='field-set'>
                    <legend>Feed Action Counts</legend>
                    <Paper variant="outlined" className="paper">
                        <ActionCount actions={actions} header="Actions Performed"/>
                    </Paper>
                    </fieldset>
                </Grid>
                <Grid item xs={7}>
                <fieldset className='field-set'>
                    <legend>World Map Highlight Feed</legend>
                    <Paper variant="outlined" className='geo-chart' ref={chartRef}>
                        <GeoChart height={height} width={width} country={country} />
                    </Paper>
                </fieldset>
                </Grid>
                <Grid item xs={4}>
                <fieldset className='field-set'>
                    <legend>Countries Feed Count</legend>
                    <Paper variant="outlined" className="geo-chart">
                        <ActionCount actions={countryCount} header="Changes Made by Countries"/>
                    </Paper>
                    </fieldset>
                </Grid>
            </Grid>
            </Box>
        </React.Fragment>
    ) 
};

export default GetWebsocketData;

