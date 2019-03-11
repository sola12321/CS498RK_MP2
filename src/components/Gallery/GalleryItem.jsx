import React from 'react';
import { Segment, Image, Label, Button} from 'semantic-ui-react';
import {GalleryItem as GalleryItemCss} from "./GalleryItem.module.scss"
import { Link } from 'react-router-dom'

function GalleryItem(props) {
    const detailLink = "/View/:" + props.movie.id.toString();
    return (
        <div className={GalleryItemCss}>
            <Link to={detailLink}>
                <Segment padded>
                    <img src={'http://image.tmdb.org/t/p/w185/' + props.movie.poster_path} alt="Not Found"/>
                    <Label size="large">{props.movie.title} </Label>
                </Segment>
            </Link>
        </div>
    );
}
export default GalleryItem;