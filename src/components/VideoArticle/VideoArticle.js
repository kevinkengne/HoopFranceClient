import React from 'react';
import './VideoArticle.css';

const VideoArticle = (props) => {
    return (
        <article onClick={() => props.onHandleLinkChange(props.duel.snippet.resourceId.videoId)} class="video-article-item" >
            <img src={ props.duel.snippet.thumbnails.medium.url } alt={props.duel.snippet.title} class="video-article-thumb"/>
            <div class="video-article-details">
                <h4>{  props.duel.snippet.title }</h4>
                <p>{ `${props.duel.snippet.description.substring(0,140)}...`}</p>
            </div>
        </article>
    );

}

export default VideoArticle;