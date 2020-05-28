import React from 'react';
import VideoArticle from '../VideoArticle/VideoArticle';
import './VideoArticleList.css';

const VideoArticleList = (props) => {

    return (
        <main class="video-article-list-main">
            {props.duels.map(duel => (
                <VideoArticle onHandleLinkChange={props.onHandleLinkChange} duel={duel}/>
            ))}
        </main>
    )
}

export default VideoArticleList;