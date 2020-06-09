import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Row } from 'antd';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import { API_URL } from '../../Utils';

const ScoresContent = () => {

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
                    <ScoreCard item={item}/>
                ))}
            </Row>
        </Layout>
        
    );
}

export default ScoresContent;