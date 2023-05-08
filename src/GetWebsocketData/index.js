import React, {useEffect, useState, useRef} from 'react';
import { Box, Grid, Paper, Button } from "@material-ui/core";
import ActionCount from '../ActionCount'
import Message from '../Message';
import GeoChart from '../GeoChart';



const GetWebsocketData = () => {
    const [data, setData] = useState([])
    const [actions, setActions] = useState({})
    const [startTime, setStartTime] = useState('')
    const [isPaused, setPause] = useState(false);
    const [country, setCountry] = useState(null);
    const [countryCount, setCountryCount] = useState({});
    const ws = useRef(null);

    const connectToWebHook = () => {
        ws.current = new WebSocket("ws://wikimon.hatnote.com:9000");
        ws.current.onopen = () => {
            setStartTime(new Date().toLocaleTimeString())
            console.log("ws opened")
        };
        ws.current.onclose = () => console.log("ws closed");
    }

    useEffect(() => {
        connectToWebHook();
        const wsCurrent = ws.current;
        return () => {
            wsCurrent.close();
        };
    }, []);

    
    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            console.log('e', JSON.stringify(message));
            const allActions = {...actions}
            const country_name = message?.geo_ip?.country_name
            if(country_name){
                countryCount[country_name] = countryCount[country_name] ? countryCount[country_name] + 1 : 1
                setCountryCount(countryCount)
            } 
            setCountry(country_name) 
            allActions[message.action] = allActions[message.action] ? allActions[message.action]+1 : 1
            setActions(allActions)
            data?.length > 100 ? setData(data.slice(-5)): setData([...data, message])
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
                spacing={5}
                alignItems="center"
                style={{ height: "100%" }}
            >
                <Grid item xs={6}>
                <fieldset className='field-set'>
                    <legend>Activity Feed</legend>
                    <Paper variant="outlined" className="paper">
                            {
                                data && data.map(d => <Message 
                                    key={d.rev_id}
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
                <Grid item xs={6}>
                <fieldset className='field-set'>
                    <legend>Feed Action Counts</legend>
                    <Paper variant="outlined" className="paper">
                        <ActionCount actions={actions} header="Actions Performed"/>
                    </Paper>
                    </fieldset>
                </Grid>
                <Grid item xs={6}>
                <fieldset className='field-set'>
                    <legend>World Map Highlight Feed</legend>
                    <Paper variant="outlined" className='geo-chart'>
                        <GeoChart height={540} width={900} country={country} />
                    </Paper>
                </fieldset>
                </Grid>
                <Grid item xs={6}>
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

