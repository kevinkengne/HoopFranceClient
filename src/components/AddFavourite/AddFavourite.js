import React from 'react';
import { Button, Tooltip } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import './AddFavourite.css';

const AddFavourite = (props) => (
        props.user &&
        <div>
          <Tooltip title="Add/Remove player from watchlist">
            <Button 
              onClick={props.onClick} 
              type={props.isFavourite ? 'danger' : 'primary'}  
              shape="circle" 
              icon={props.isFavourite ? <StarFilled/> : <StarOutlined/>}/>
          </Tooltip>
        </div>
        

);
    


export default AddFavourite;