import React from 'react';
import { Card, Tag, Row, Col, Button } from 'antd';
import moment from 'moment';
import { CDN_URL } from '../../Utils';
import AddFavourite from '../AddFavourite/AddFavourite';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const PlayerCard = (props) => {

    const dateFormat = 'MMMM Do YYYY';

    return (
        <Card
            hoverable
            cover={
                <img
                    alt={`${props.full_name}`}
                    src={`${CDN_URL}/TeamLogos/BOS_logo.svg`}/>
                }
            style={{ width: 280 }}>
            <Meta
                title={props.full_name}
                description={props.team_name}/>
            <div style={{ padding: '10px 0'}}>
                <Row style={{ textAlign: 'left' }}>
                    <Col span={8}>
                        <p><Tag color="blue">Height</Tag></p>
                        <p><Tag color="blue">Weight</Tag></p>
                        <p><Tag color="blue">Position</Tag></p>
                        <p><Tag color="blue">No. </Tag></p>
                    </Col>
                    <Col span={16}>
                        <p>{props.height}</p>
                        <p>{props.weight}</p>
                        <p>{props.pos}</p>
                        <p>{props.number}</p>
                    </Col>
                </Row>
                <Row>
                    { props.hasAddFavourite &&
                        <Col span={4}>
                            <AddFavourite 
                                    isFavourite={props.isFavourite}
                                    onClick={() => props.onUpdateFavourite(props.playerId, props.user.uid)}
                                    user={props.user}/>
                        </Col>
                    }
                    <Col span={20}>
                          
                        Born: {moment(props.dob).format(dateFormat)}  
                    </Col>
                </Row>
                { props.hasStats &&
                    <Row justify="center">
                        <Button><Link to={`/players/${props.api}`}>See details</Link></Button>
                    </Row>
                }
            </div>
        </Card>
    );
}

export default PlayerCard;