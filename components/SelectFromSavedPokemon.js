import React, { useState } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import DisplayFoundedPokemon from './DisplayFoundedPokemon';


export default function ModifyPokemon (props) {
   const [pokemons,setPokemons] = useState(props.navigation.state.params.pokemons);
   if(props.navigation.state.params.pokemons != pokemons && props.navigation.state.params.pokemons<=pokemons) { setPokemons(props.navigation.state.params.pokemons) };
    console.log(pokemons);
    discard = () => {  };
    
    reset = (pokimons) => {
        setPokemons(pokimons)
    }

    return (
        <ImageBackground
            source={require('../img/poke.jpg')}
            style={{
                height: 'auto',
                width: 'auto',
                position: 'relative', 
                top: 0,
                left: 0,
                flex: 1
            }}
        >
        <ScrollView>
            { pokemons.map( x =>  <DisplayFoundedPokemon pokemon={{ name : x.nombre, ataque1 : x.ataquePrimario, ataque2 : x.ataqueSecundario, img : x.img, type: x.tipo}} con={props.navigation.state.params.cons} navigation={props.navigation} discard={discard} inDB={true} search={false} reset={reset}/> ) }
        </ScrollView>
        
        </ImageBackground>
    );
}