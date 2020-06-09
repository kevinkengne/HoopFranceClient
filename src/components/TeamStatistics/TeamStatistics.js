import React from 'react';
import { Row, Col, Statistic } from 'antd';
import { getPercentage } from '../../Utils';

const TeamStatistics = ({ stats }) => {

    const blocks = stats.blocks != null ? stats.blocks : 0;
    const fgp = getPercentage(stats.fgm, stats.fga);
    const ftp = getPercentage(stats.ftm, stats.fta);

    return (
        <div>
            <Row gutter={16}>
                <Col span={4}><Statistic title="Points" value={stats.points}/></Col>
                <Col span={4}><Statistic title="Assists" value={stats.ass}/></Col>
                <Col span={4}><Statistic title="Rebounds" value={stats.reb}/></Col>
                <Col span={3}><Statistic title="FGM" value={stats.fgm}/></Col>
                <Col span={3}><Statistic title="FGA" value={stats.fga}/></Col>
                <Col span={6}><Statistic title="FGP" value={fgp} precision={2} suffix="%"/></Col>
            </Row>
            <Row gutter={16}>
                <Col span={4}><Statistic title="STL" value={stats.steals}/></Col>
                <Col span={4}><Statistic title="TO" value={stats.turnovers}/></Col>
                <Col span={4}><Statistic title="BLK" value={blocks}/></Col>
                <Col span={3}><Statistic title="FTM" value={stats.ftm}/></Col>
                <Col span={3}><Statistic title="FTA" value={stats.fta}/></Col>
                <Col span={6}><Statistic title="FTP" value={ftp} precision={2} suffix="%"/></Col>
            </Row>
        </div>
        );
    
}

export default TeamStatistics;