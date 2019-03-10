import React, {Component} from 'react';
import {InputField, SearchArea, SearchRes} from "./SearchBar.module.scss";
import {Input} from 'semantic-ui-react';
import SearchItem from './SearchItems/SearchItem';
import { Checkbox, List } from 'semantic-ui-react';
import axios from 'axios';


class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            items:[],
            idOrder: false,  //True for inc, False for dec
            popularityOrder: false
        };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.idOrderChangeHandler = this.idOrderChangeHandler.bind(this);
        this.popularityOrderChangeHandler = this.popularityOrderChangeHandler.bind(this);
    }

    idOrderChangeHandler(){
        console.log(this.state.idOrder);
        let flag = this.state.idOrder;
        let items = this.state.items;
        items.sort(function(a,b){
            if(flag){
                return a.popularity - b.popularity;
            } else {
                return b.popularity - a.popularity;
            }
        });
        this.setState({idOrder: !this.state.idOrder, items:items});
    }
    popularityOrderChangeHandler(){
        let flag = this.state.popularityOrder;
        let items = this.state.items;
        items.sort(function(a,b){
            if(flag){
                return a.popularity - b.popularity;
            } else {
                return b.popularity - a.popularity;
            }
        });
        this.setState({popularityOrder: !this.state.popularityOrder, items:items});
    }


    inputChangeHandler(event){
        console.log("here");
        const baseUrl = 'https://api.themoviedb.org/3/search/movie?page=1&api_key=fc69623e0fb05a8389af39791861271d&query='
        let queryStr = event.target.value;
        if (queryStr.length === 0){
            this.setState({
                items: []
            });
        }
        else{
            axios.get(baseUrl+queryStr).then((response) => {
                let items = response.data.results;
                let flag = this.state.popularityOrder;
                items.sort(function(a,b){
                    if(flag){
                        return a.popularity - b.popularity;
                    } else {
                        return b.popularity - a.popularity;
                    }
                });
                flag = this.state.idOrder;
                items.sort(function(a,b){
                    if(flag){
                        return a.id - b.id;
                    } else {
                        return b.id - a.id;
                    }
                });
                this.setState({
                    items: items
                });
                console.log(this.state.items.length);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const res = this.state.items.map(
            (item)=><SearchItem movie={item}/>
        );
        return (
            <div className={SearchArea}>
                <div className={InputField}>
                    <div>
                        <Checkbox label="Ascending on popularity?" onChange={this.popularityOrderChangeHandler}/>
                    </div>
                    <div>
                        <Checkbox label="Ascending on id?" onChange={this.idOrderChangeHandler}/>
                    </div>
                    <p>Please check the box before search.</p>
                    <Input size='large' icon='search' placeholder='Search...' onChange={this.inputChangeHandler}/>
                </div>
                <div className={SearchRes}>
                    <List divided verticalAlign='middle'>
                        {res}
                    </List>
                </div>
            </div>

        );
    }
}

export default SearchBar;