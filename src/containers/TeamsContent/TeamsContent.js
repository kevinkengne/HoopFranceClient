import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Statistic, Button } from 'antd';
import axios from 'axios';
import { CDN_URL } from '../../Utils';

const { Meta } = Card;

const TeamsContent = () => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
           try {
                const teams = await axios('http://localhost:8000/teams'); 
                const standing = await axios('http://localhost:8000/standing');

                const result = teams.data.map( team => ({
                    team_id: team.team_id,
                    full_name: team.full_name,
                    short_name: team.short_name,
                    conf_name: team.conf_name,
                    standing: standing.data.find(el => team.short_name === el.team)
                }));
                setTeams(result);
           } catch (error) {
               console.log(error);
           }      
        };

        fetchData();
    }, []);
    
    return (   
        <Layout style={{ textAlign: 'center'}}>
            <Row gutter={16}>
                {teams.map(team => 
                   (<Col 
                        className="gutter-row" 
                        key={team.team_id}
                        span={{
                            xs: 24,
                            sm: 24,
                            md: 6,
                            lg: 4
                        }}>
                            <div style={{ padding: '8px 0'}}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={`${team.full_name} logo`}
                                            src={`${CDN_URL}/TeamLogos/${team.short_name}_logo.svg`}/>
                                }
                                style={{ width: 280 }}>
                                    <Meta
                                        title={team.full_name}
                                        description={team.conf_name}/>
                                    <Row style={{ textAlign: 'center' }}>
                                        <Col span={12}>
                                            <Statistic
                                                title="Wins"
                                                value={team.standing.win}
                                                valueStyle={{ color: '#3f8600' }}/>
                                        </Col>
                                        <Col span={12}>
                                            <Statistic
                                                title="Losses"
                                                value={team.standing.loss}
                                                valueStyle={{ color: '#cf1322' }}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Button type="link">Players</Button>
                                            <Button type="link">Standing</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </div> 
                    </Col>))
                }
            </Row>
        </Layout>        
    );
}

export default TeamsContent;