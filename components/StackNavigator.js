import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from "react-navigation";
import FindAndHandlePokemon from './FindAndHandlePokemon';
import ModifyPokemon from './ModifyPokemon';
import SelectFromSavedPokemon from './SelectFromSavedPokemon';

const Routes = {
    Home: {
      screen: FindAndHandlePokemon,
      navigationOptions: () => ({
        title: `Pokedex!`,
        headerStyle: {
          backgroundColor: 'red',
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 32,
            fontFamily: 'Pokemon Solid',
            marginLeft : 'auto',
            marginRight: 'auto'
        },
        headerLayoutPreset: 'center',
        flex:1,
  
      }),
    },
    Modify: { screen : ModifyPokemon,
        navigationOptions: () => ({
            title: `Modificar Pokemons`,
            headerStyle: {
                backgroundColor: 'red',
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 32,
                fontFamily: 'Pokemon Solid',
                marginLeft : 'auto',
                marginRight: 'auto'
            },
            headerLayoutPreset: 'center',
            flex:1,
        
        }),
    },
    View : { screen: SelectFromSavedPokemon,
        navigationOptions: () => ({
            title: `Mis Pokemons`,
            headerStyle: {
                backgroundColor: 'red',
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 32,
                fontFamily: 'Pokemon Solid',
                marginLeft : 'auto',
                marginRight: 'auto'
            },
            headerLayoutPreset: 'center',
            flex:1,
        
        }),
    }    
  };
  
  export const Navigator = createStackNavigator(Routes, {
    initialRouteName: "Home"
  });
  
  const AppContainer = createAppContainer(Navigator);


export default function App () {
    return ( 
        <AppContainer/>
    )
  }
  