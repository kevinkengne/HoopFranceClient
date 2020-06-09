import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL,  CDN_URL, getTeamPlayed } from '../../Utils';
import { Row, Avatar, Descriptions } from 'antd';
import PlayerStatistics from '../../components/PlayerStatistics/PlayerStatistics';
import moment from 'moment';
import axios from 'axios';

const PlayerDetailContent = () => {

    let { playerId } = useParams();
    const [player, setPlayer] = useState({});
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
           try {
                const response = await axios(`${API_URL}/players/${playerId}`);
                const result = response.data;
                setPlayer(result);

                const statList = result.statistics.map( stat => ({
                    date: moment(stat.date).format('ddd MM/DD'),
                    against: getTeamPlayed(stat.home, stat.away, player.team_name),
                    points: stat.points,
                    ass: stat.ass,
                    reb: stat.reb,
                    fgm: stat.fgm,
                    fga: stat.fga,
                    ftm: stat.ftm,
                    fta: stat.fta,
                    stl: stat.steals,
                    blk: stat.blocks,
                    to: stat.turnovers
                }));
                setStatistics(statList);
           } catch (error) {
               console.log(error);
           }      
        };

        fetchData();
    }, [playerId, player.team_name]);

    return (
        <div>
            <Row justify="center">
                <Avatar 
                    shape="square"
                    src={`${CDN_URL}/TeamLogos/BOS_logo.svg`} size={300} />
            </Row>
            <Row justify="center">
                <Descriptions bordered>
                    <Descriptions.Item label="Height">{player.height}</Descriptions.Item>
                    <Descriptions.Item label="Weight">{player.weight}</Descriptions.Item>
                    <Descriptions.Item label="Position">{player.pos}</Descriptions.Item>
                    <Descriptions.Item label="Born">{player.dob}</Descriptions.Item>
                    <Descriptions.Item label="Prior">{player.before}</Descriptions.Item>
                    <Descriptions.Item label="No.">#{player.no}</Descriptions.Item>
                </Descriptions>
            </Row>
            <Row justify="center" style={{ padding: '30px'}}>                 
                <PlayerStatistics dataSource={statistics}/>          
            </Row>
            
        </div>
    );
}

export default PlayerDetailContent;