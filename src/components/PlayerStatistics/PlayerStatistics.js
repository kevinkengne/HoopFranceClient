import React from 'react';
import { Table } from 'antd';


const PlayerStatistics = (props) => {

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Opp',
            dataIndex: 'against',
            key: 'against'
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points'
        },
        {
            title: 'Assists',
            dataIndex: 'ass',
            key: 'ass'
        },
        {
            title: 'Reb',
            dataIndex: 'reb',
            key: 'reb'
        },
        {
            title: 'FGM',
            dataIndex: 'fgm',
            key: 'fgm',
            responsive: ['md']
        },
        {
            title: 'FGA',
            dataIndex: 'fga',
            key: 'fga',
            responsive: ['md']
        },
        {
            title: 'FTM',
            dataIndex: 'ftm',
            key: 'ftm',
            responsive: ['lg']
        },
        {
            title: 'FTA',
            dataIndex: 'fta',
            key: 'fta',
            responsive: ['lg']
        },
        {
            title: 'STL',
            dataIndex: 'stl',
            key: 'stl',
            responsive: ['lg']
        },
        {
            title: 'BLK',
            dataIndex: 'blk',
            key: 'blk',
            responsive: ['lg']
        },
        {
            title: 'TO',
            dataIndex: 'to',
            key: 'to',
            responsive: ['lg']
        }
    ]

    return (
        <Table 
            dataSource={props.dataSource} 
            columns={columns}/>
    );
    
}

export default PlayerStatistics;