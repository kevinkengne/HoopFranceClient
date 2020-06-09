import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout , Row, Col, Select, Tag } from 'antd';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import { API_URL, getName } from '../../Utils';
import { withFirebase } from '../../components/Firebase';
import { withUser } from '../../components/Session';
import { compose } from 'recompose';

const { Option } = Select;

const PlayersContent = (props) => {
   
    const [players, setPlayers] = useState([]);
    const [currentTeam, setCurrentTeam] = useState(props.location.pathname + props.location.search);
    const [teams, setTeams] = useState([]);
    const [favourites, setFavourites] = useState([]);

    const handleChangeTeam = (value) => {
        const query = `?team=${value}`;
        setCurrentTeam(`${props.location.pathname}${query}`);
        const searchParams = new URLSearchParams(query);
        props.history.push({
            search: searchParams.toString()
        });
    };

    const getCurrentTeam = () => new URLSearchParams(props.location.search).get('team');

    const handleAddFavourite = (player, user) => {
        props.firebase.favourites().push({
            playerId: player,
            userId: user
        });

    }

    const handleRemoveFavourite = (favouriteId) => {
        props.firebase.favourite(favouriteId).remove();
    }

    const handleUpdateFavourite = (player, user) => {
        const favourite = favourites.find(element => element.playerId === player);

        if (favourite) {
            handleRemoveFavourite(favourite.id);
        } else {
            handleAddFavourite(player, user);
        }
    }

    const isPlayerAdded = (playerId) => favourites.some(element => element.playerId === playerId);
 
    useEffect(() => {
        
        const fetchData = async () => {
           try {
                const players = await axios(`${API_URL}${currentTeam}`);
                const teams = await axios(`${API_URL}/teams`);
                setTeams(teams.data);
                setPlayers(players.data);
           } catch (error) {
               console.log(error);
           }      
        };

        fetchData();
    }, [currentTeam]);

    useEffect(() => {
        const getFavourites = () => {

            if (!props.user) return;

            props.firebase.favouritesByUser(props.user.uid)
                .on('value', snapshot => {
                    if (snapshot && snapshot.exists()) {
                        //Set values in state which can be extracted in jsx in render.
                        const result = snapshot.val();
                        const resultList = Object.keys(result).map(key => ({
                            ...result[key],
                            id: key
                        }));
                       
                        setFavourites(resultList); 
                     };
    
                });   
        };

        getFavourites();
    }, [props.firebase, props.user]);

    return (
        <Layout style={{ textAlign: 'center'}}>
            <Row gutter={16}>
                <Col span={20}>
                    <h1><Tag color="purple">Select Team</Tag></h1>
                    <Select 
                        defaultValue={parseInt(getCurrentTeam())}
                        style={{ width: 200 }}
                        onChange={handleChangeTeam}>
                        {teams.map(team => (
                            <Option key={team.team_id} value={team.team_id}>{team.full_name}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row gutter={16}>
                {players.map(player => 
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
                                        user={props.user}
                                        playerId={player.id}
                                        hasAddFavourite={true}
                                        hasStats={false}
                                        api={player.api}
                                        isFavourite={isPlayerAdded(player.id)}
                                        onUpdateFavourite={handleUpdateFavourite}/>
                                </div>
                        </Col>
                    ))}
            </Row>
        </Layout>      
    );
}

export default compose(
    withFirebase,
    withUser
)(PlayersContent);