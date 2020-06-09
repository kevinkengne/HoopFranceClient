import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withUser } from '../../components/Session';
import { compose } from 'recompose';
import axios from 'axios';
import { API_URL, getName } from '../../Utils';
import { Layout, Row, Col } from 'antd';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

class WatchListContent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            players: []
        };
    }

    async componentDidMount() {
        this._isMounted = true;

        this.props.firebase.favouritesByUser(this.props.user.uid)
            .on('value', snapshot => {
                if (snapshot && snapshot.exists()) {
                    //Set values in state which can be extracted in jsx in render.
                    const result = snapshot.val();
                    const resultList = Object.keys(result).map(key => result[key].playerId);

                    let params = new URLSearchParams();
                    for (let player of resultList) params.append('id', player);
                    
                    axios(`${API_URL}/players`, { params: params })
                        .then((players) => {
                            if (this._isMounted) {
                                this.setState({ players: players.data })
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
            }); 
        
    }

    componentWillUnmount() {
        this.props.firebase.favouritesByUser(this.props.user.uid).off();
        this._isMounted = false;
    }

    render() {
        return (
            <Layout style={{ textAlign: 'center'}}>
                <Row gutter={16}>
                    {this.state.players.map(player => 
                        (
                            <Col
                                className="gutter-row" 
                                key={player.id}
                                span={{
                                    xs: 24,
                                    sm: 24,
                                    md: 6,
                                    lg: 4
                                }}>
                                    <div style={{ padding: '8px 0'}}>
                                        <PlayerCard
                                            full_name={`${getName(player.name).firstName} ${getName(player.name).lastName}`}
                                            team_name={player.team_name}
                                            height={player.height}
                                            weight={player.weight}
                                            number={player.no}
                                            pos={player.pos}
                                            dob={player.dob}
                                            user={this.props.user}
                                            playerId={player.id}
                                            api={player.api}
                                            hasAddFavourite={false}
                                            hasStats={true}/>
                                    </div>
                            </Col>
                        ))}
                </Row>
            </Layout>
        );
    }
}

export default compose(
    withFirebase,
    withUser
)(WatchListContent);