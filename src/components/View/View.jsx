import React, {Component}from 'react';
import {Image, Container, Label,Button} from 'semantic-ui-react';
import {Content, Buttons} from "./View.module.scss";
import axios from 'axios';

class View extends Component{
    constructor(props){
        super();
        const id = props.location.pathname.substring(7);
        console.log(id);
        this.state = { id: parseInt(id), movie: null };
        this.changeContentHandler = this.changeContentHandler.bind(this);
    }
    componentDidMount(){
        const queryStr = "https://api.themoviedb.org/3/movie/"+this.state.id.toString()+"?api_key=fc69623e0fb05a8389af39791861271d";
        let movie = null;
        axios.get(queryStr).then((response) => {
            movie = response.data;
            this.setState({movie:movie});
        }).catch((error) => {
            console.log(error);
        });
    }

    changeContentHandler(id){
        const queryStr = "https://api.themoviedb.org/3/movie/"+id.toString()+"?api_key=fc69623e0fb05a8389af39791861271d";
        let movie = null;
        axios.get(queryStr).then((response) => {
            movie = response.data;
            this.setState({movie:movie, id:id});
        }).catch((error) => {
            movie=null;
            this.setState({movie:movie, id:id})
        });
    }


    render(){
        let view = <div>No result with id={this.state.id.toString()}</div>;
        if(this.state.movie !== null){
            const genres = this.state.movie.genres.map((g)=>(
                <Label size="large">{g.name}</Label>
            ));
            view =
                <Container>
                    <Image src={'http://image.tmdb.org/t/p/w185/'+ this.state.movie.poster_path} alt="Not Found" floated='left'/>
                    <h2>{this.state.movie.title}</h2>
                    <h5>Date:{this.state.movie.release_date} Id:{this.state.movie.id}</h5>
                    <p>{this.state.movie.overview}</p>
                        {genres}
                </Container>
        }
        return(
            <div className={Content}>
                <div className={Buttons}>
                    <Button labelPosition='left' icon='left chevron' content='Previous' onClick={()=>this.changeContentHandler(this.state.id-1)}/>
                    <Button labelPosition='right' icon='right chevron' content='Next' onClick={()=>this.changeContentHandler(this.state.id+1)}/>
                </div>
                {view}
            </div>
        );
    }
}

export default View;