import React, { useState, useEffect } from 'react';
import { Layout, Table, Avatar } from 'antd';
import { CDN_URL, API_URL } from '../../Utils';
import axios from 'axios';

const StandingContent = (props) => {

    const [standing, setStanding] = useState([]);

    const columns = [
        {
            title: '',
            dataIndex: 'conference_rank',
            width: 40,
            key: 'conference_rank',
            render: rank => (
                <span style={{ fontWeight: 'bold' }}>{rank}</span>
            )
        },
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team',
            render: team => (
                <span>
                    <Avatar 
                        src={`${CDN_URL}/TeamLogos/${team.substring(0,3)}_logo.svg`}
                        size="large"/>
                    <span style={{ paddingLeft: '8px'}}>{team.substring(3)}</span>
                </span>       
            )
        },
        {
            title: 'W',
            dataIndex: 'win',
            key: 'win',
        },
        {
            title: 'L',
            dataIndex: 'loss',
            key: 'loss',
            responsive: ['sm']
        },
        {
            title: 'WIN%',
            dataIndex: 'win_percentage',
            key: 'win_percentage',
            responsive: ['md']
        },
        {
            title: 'DIV',
            dataIndex: 'division',
            key: 'division',
            responsive: ['md']
        },
    ]

    const getWinningPercentage = (wins, losses) => (
            (wins / (wins+losses))
            .toFixed(3)
            .toString()
            .substring(1)
        );

    useEffect (() => {

        const fetchData = async () => {
            try {
                const teams = await axios(`${API_URL}/teams`); 
                const standing = await axios(`${API_URL}${props.location.pathname + props.location.search}`); 
                let key = 0;
                const dataSource = standing.data.map(standing => ({
                    key: ++key,
                    conference_rank: standing.conference_rank,
                    team: `${standing.team}${teams.data.find(el => el.short_name === standing.team).full_name}`,
                    win: standing.win,
                    loss: standing.loss,
                    win_percentage : getWinningPercentage(standing.win, standing.loss),
                    division: standing.division,
                }));
                setStanding(dataSource);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [props.location.pathname, props.location.search]);

    return (
        <Layout style={{ textAlign: 'center'}}>
            <Table columns={columns} dataSource={standing}/>
        </Layout>
        
    );
}

export default StandingContent;