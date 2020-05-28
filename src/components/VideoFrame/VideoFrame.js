import React from 'react';
import './VideoFrame.css';

const VideoFrame = (props) => {

    return (
        <section id="video">
            <iframe
                class="video-frame"
                title="Duels"
                src={`https://www.youtube.com/embed/${props.link}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen/>
        </section>
    )
}
export default VideoFrame;