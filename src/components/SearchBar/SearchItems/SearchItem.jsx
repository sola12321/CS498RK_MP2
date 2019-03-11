import React from 'react';
import { Link } from 'react-router-dom';
import {List, Image} from "semantic-ui-react";
import PropTypes from 'prop-types';

function SearchItem(props) {
    return (
            <List.Item>
                <Image size="mini" src={'http://image.tmdb.org/t/p/w185/'+ props.movie.poster_path} />
                <List.Content>
                    <Link to={process.env.PUBLIC_URL+"/View/:" + props.movie.id.toString()}>
                    <List.Header>{props.movie.title}</List.Header>
                     <List.Description>{props.movie.release_date}</List.Description>
                    </Link>
                </List.Content>
            </List.Item>
    );

}
SearchItem.propTypes = {
    movie: PropTypes.object
};

export default SearchItem;