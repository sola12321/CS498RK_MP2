import React, {Component} from 'react';
import { Button, Divider } from 'semantic-ui-react';
import {ButtonGroup, Items as ItemsCss} from './Gallery.module.scss';
import axios from 'axios';
import GalleryItem from "./GalleryItem";

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        };

        this.changeTypeHandler = this.changeTypeHandler.bind(this);
    }

    changeTypeHandler(type){
        const baseUrls = ["https://api.themoviedb.org/3/movie/popular?api_key=fc69623e0fb05a8389af39791861271d&page=1",
                          "https://api.themoviedb.org/3/movie/top_rated?api_key=fc69623e0fb05a8389af39791861271d&page=1",
                          "https://api.themoviedb.org/3/movie/upcoming?api_key=fc69623e0fb05a8389af39791861271d&page=1"];
        const baseUrl = baseUrls[type];
        axios.get(baseUrl).then((response) => {
            const items = response.data.results;
            this.setState({
                items: items
            });
            console.log(this.state.items.length);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let items = [];
        if(this.state.items.length > 0) {
            items = this.state.items.map((item)=> <GalleryItem movie={item} />)
        }

        return (
            <div>
                <div className={ButtonGroup}>
                    <Button.Group widths='3' size="large">
                        <Button onClick={()=>this.changeTypeHandler(0)}>Popular</Button>
                        <Button onClick={()=>this.changeTypeHandler(1)}>Top Rated</Button>
                        <Button onClick={()=>this.changeTypeHandler(2)}>Upcoming</Button>
                        <Divider/>
                    </Button.Group>
                </div>
                <div className={ItemsCss}>
                    {items}
                </div>
            </div>
        );
    }
}

export default Gallery;