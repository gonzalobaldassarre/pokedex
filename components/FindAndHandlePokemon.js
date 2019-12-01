

import React, { useState, useEffect } from 'react';;
import { View,ImageBackground, ToastAndroid } from 'react-native';
import { Button, Input} from 'react-native-elements';
import DisplayFoundedPokemon from './DisplayFoundedPokemon';
import PokeDB from '../classes/PokeDB';
const con = new PokeDB();
let thePokes = [];

export default function FindAndHan (props) {

    const [name,setName] = useState("");
    const [loaded,setLoaded] = useState(false);
    const [unpokemon,setPokemon] = useState({});
    const [inDB,setInDB] = useState(false);

    
    find = () => {
      setName('');
      setLoaded(true);
      console.log('executing find');
    };

    discard = () => {
      setLoaded(false);
    };


    getPokemon = () => {
    con.getPokemons()
    .then( (pokem) => thePokes = pokem )
      .then( () => {
        for (let i=0;i<thePokes.length;i++) {
          if (name.toLocaleUpperCase() == thePokes[i].nombre.toLocaleUpperCase()) {
            const thePoke = {
              name: thePokes[i].nombre, 
              ataque1: thePokes[i].ataquePrimario, 
              ataque2: thePokes[i].ataqueSecundario, 
              type: thePokes[i].tipo,
              img: thePokes[i].img
            };
            setPokemon(thePoke);
            setInDB(true); 
            setLoaded(true);
            setName("");
            
            return;
          }
        }

        if(name==""){
          ToastAndroid.showWithGravity(
            'Ingrese un nombre para buscar!',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
          return;
        }

        const uri = 'https://pokeapi.co/api/v2/pokemon/'
        fetch(uri.concat(name.toLowerCase().replace(' ', '')).concat('/'))
          .then( pokemon => {
            if(pokemon.status == 404) {
              ToastAndroid.showWithGravity(
              'El pokemon "'+name+'" no existe',
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
            );

            setName("");

            return null;
          } 
  
          else {
            return pokemon.json();
          }
  
        }).then( res => {
          if(res==null) { return }
          console.log(res.sprites.front_default);
          const thePoke = {
            name: res.species.name, 
            ataque1: res.moves[0].move.name, 
            ataque2: res.moves[1].move.name, 
            type: res.types[0].type.name,
            img: res.sprites.front_default
          };
          
          setPokemon(thePoke);
          setInDB(false); 
          setLoaded(true);
          setName("");
            
        });
      })
    }

    display = () => {
      if(!loaded){
        return (
          <View style={{ marginTop: 'auto', marginBottom: 0}}>
            <Input
              label='Nombre del pokemon'
              value={name}
              containerStyle={{backgroundColor: '#ffffff'}}
              placeholder='Ingrese un pokemon'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text) => setName(text)}
            />
            <Button
              buttonStyle={{ backgroundColor: '#ff0000' }}
              titleStyle={{ fontFamily:'Pokemon Solid' }}
              onPress={() => getPokemon()}
              title="b u s c a r !"
            />
            <Button
              buttonStyle={{ backgroundColor: '#4f0000' }}
              titleStyle={{ fontFamily:'Pokemon Solid' }}
              onPress={ () => { con.getPokemons()
                .then( (pokem) => {
                  props.navigation.navigate('View',{ pokemons: pokem, cons : con}) 
                })
              } }
              title="Ver mis pokemons"
            />  

            
          </View>
        );
      }
      else {
        return (
          <DisplayFoundedPokemon pokemon={unpokemon} pokemons={thePokes} con={con} discard={discard} inDB={inDB} search={true} navigation={props.navigation}/>
        )
      }
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
      
      {display()}

    </ImageBackground>
    
    );
}
