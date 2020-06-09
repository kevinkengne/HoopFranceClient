import React from 'react';
import { Modal, Tabs } from 'antd';
import TeamStatistics from '../TeamStatistics/TeamStatistics';

const { TabPane } = Tabs;

const ScoreModal = (props) => {

    return (
        <Modal
          destroyOnClose
          title="Advanced Statistics"
          visible={props.visible}
          onCancel={props.onCancel}
          footer={null}>
            <Tabs>
                <TabPane tab={props.teamNames.home} key="1">
                    <TeamStatistics stats={props.teamStats.home}/>
                </TabPane>
                <TabPane tab={props.teamNames.away} key="2">
                    <TeamStatistics stats={props.teamStats.away}/>
                </TabPane>
            </Tabs>
        </Modal>
    );
}

export default ScoreModal;