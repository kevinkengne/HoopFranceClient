import React, { useState, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import { API_URL } from '../../Utils';
import VideoFrame from '../../components/VideoFrame/VideoFrame';
import VideoArticleList from '../../components/VideoArticleList/VideoArticleList';
import axios from 'axios';

const VideoContent = () => {

    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentLink, setCurrentLink] = useState('nOzo4pHTZ-M');

    const handleLinkChange = (link) => {
        setCurrentLink(link);
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const videos = await axios(`${API_URL}/duels`);
                setVideos(videos.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <Layout style={{ textAlign: 'center'}}>

           {
               isLoading ? 
               (
                    <Spin tip="Loading..."/>
               ) : 
               (
                    <Layout>
                        <VideoFrame link={currentLink}/>
                        <VideoArticleList duels={videos} onHandleLinkChange={handleLinkChange}/>
                    </Layout>   
               )
           }
        </Layout>
        
    );
}

export default VideoContent;