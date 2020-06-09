import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Statistic, Space, Button } from 'antd';
import { CDN_URL } from '../../Utils';
import ScoreModal from '../ScoreModal/ScoreModal';
import moment from 'moment';

const ScoreCard = ({ item, }) => {

    const homeName = item.home;
    const homeStats = item.statistics.find(element => element.team_id === parseInt(item.home_id));

    const awayName = item.away;
    const awayStats = item.statistics.find(element => element.team_id === parseInt(item.away_id));
    
    const dateFormat = 'MMMM Do';

    const [isVisible, setIsVisible] = useState(false);

    const showModal = () => setIsVisible(true);

    const hideModal = () => setIsVisible(false);

    return (
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
                <Card headStyle={{ textAlign: 'left' }}title={moment(item.date_time).format(dateFormat)}style={{ width: 330, height: 200 }}>
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
                    <Row justify="center" align="middle">
                        <Button type="primary" onClick={showModal}>
                            See Stats
                        </Button>
                        <ScoreModal
                            visible={isVisible}
                            onCancel={hideModal}
                            game={item.game_id}
                            teamStats={{
                                home : homeStats,
                                away : awayStats
                            }}
                            teamNames={{
                                home : homeName,
                                away: awayName
                            }}
                            />
                    </Row>
                </Card>
            </Space>
        </Col>
    );
    
}

export default ScoreCard;