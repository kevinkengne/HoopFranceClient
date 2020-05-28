import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Card, Row, Col, Avatar, Statistic, Space } from 'antd';
import { CDN_URL, API_URL } from '../../Utils';
import moment from 'moment';

const ScoresContent = () => {

    const dateFormat = 'MMMM Do';
    const [scores, setScores] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
           try {
                const scores = await axios(`${API_URL}/scores`);
                setScores(scores.data);
                
           } catch (error) {
               console.log(error);
           }      
        };

        fetchData();
    }, []);

    return (
        <Layout style={{ textAlign: 'center'}}>
            <Row gutter={16}>
                { scores.map(item => (
                    <Col
                        className="gutter-row"
                        key={item.game_id}
                        span={{
                            xs: 24,
                            sm: 24,
                            md: 6,
                            lg: 4
                        }}>
                        <Space size="large">
                            <Card headStyle={{ textAlign: 'left' }}title={moment(item.date_time).format(dateFormat)}style={{ width: 330, height: 180 }}>
                                <Row justify="center" align="middle">
                                    <Col flex={2} style={{ textAlign: 'left' }}><Avatar src={`${CDN_URL}/TeamLogos/${item.home_short}_logo.svg`}/></Col>
                                    <Col flex={4} style={{ textAlign: 'left' }}><h1>{item.home}</h1></Col>
                                    <Col flex={2} style={{ textAlign: 'right' }}><Statistic value={item.home_score} valueStyle={ item.home_score > item.away_score ? {}: { color: '#cf1322' }}/></Col>
                                </Row>
                                <Row justify="center" align="middle">
                                    <Col flex={2} style={{ textAlign: 'left' }}><Avatar src={`${CDN_URL}/TeamLogos/${item.away_short}_logo.svg`}/></Col>
                                    <Col flex={4} style={{ textAlign: 'left' }}><h1>{item.away}</h1></Col>
                                    <Col flex={2} style={{ textAlign: 'right' }}><Statistic value={item.away_score} valueStyle={ item.away_score > item.home_score ? {}: { color: '#cf1322' }}/></Col>  
                                </Row>
                            </Card>
                        </Space>
                    </Col>
                ))}
            </Row>
        </Layout>
        
    );
}

export default ScoresContent;