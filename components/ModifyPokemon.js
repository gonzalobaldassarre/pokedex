import React, { useState } from 'react';
import { View,ImageBackground, ToastAndroid, StyleSheet } from 'react-native';
import { Card, Input, Button} from 'react-native-elements';

export default function ModifyPokemon (props) {
    const [at1,setAt1]  = useState(props.navigation.state.params.pokemon.ataque1);
    const [at2,setAt2]  = useState(props.navigation.state.params.pokemon.ataque2);
    const [tipo,setTipo]= useState(props.navigation.state.params.pokemon.type);

    guardar = () => {
        let poke = {
            name : props.navigation.state.params.pokemon.name,
            ataque1 : at1,
            ataque2 : at2,
            tipo : tipo
        }
        props.navigation.state.params.cons.update(poke)
            .then(() => {
                ToastAndroid.showWithGravity(
                    'Modificacio exitosa',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                );
                props.navigation.state.params.cons.getPokemons()
                .then( (pokemons) => {
                    props.navigation.navigate('View',{ pokemons: pokemons, cons : props.navigation.state.params.cons})
                })
            });
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
        <View>
            <Card
                title={props.navigation.state.params.pokemon.name.toUpperCase()}
                image={{uri: props.navigation.state.params.pokemon.img }} 
                >
                <Input
                    label='Ataque principal'
                    value={at1}
                    containerStyle={{backgroundColor: '#ffffff'}}
                    placeholder='Ingrese un pokemon'
                    onChangeText={(text) => setAt1(text)}
                />

                <Input
                    label='Ataque secundario'
                    value={at2}
                    containerStyle={{backgroundColor: '#ffffff'}}
                    placeholder='Ingrese un pokemon'
                    onChangeText={(text) => setAt2(text)}
                />
                <Input
                    label='Tipo'
                    value={tipo}
                    containerStyle={{backgroundColor: '#ffffff'}}
                    placeholder='Ingrese un pokemon'
                    onChangeText={(text) => setTipo(text)}
                />
                <Button
                        buttonStyle={{ backgroundColor: '#4f0000' }}
                        titleStyle={{ 
                            fontFamily:'Comic',
                            fontWeight:'bold',
                        }}
                        onPress={  () => guardar() }
                        title="Guardad cambios!"
                />
                
            </Card>
        </View>
            
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    description: {
        marginBottom: 10, 
        fontSize: 20, 
        textAlign: 'justify'
    },
});