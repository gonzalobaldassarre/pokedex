import React, { Component } from 'react';
import { View,StyleSheet, Text, ToastAndroid } from 'react-native';
import { Card, Button} from 'react-native-elements';


export default class DisplayFoundedPokemon extends Component {
    
    constructor(props){
        super(props);
    }

    guardar = () => {
        this.props.con.generarTabla().then( () => {
            let poke = this.props.pokemon;
            this.props.con.insertar(
                poke.name,
                poke.ataque1,
                poke.ataque2,
                poke.type,
                poke.img)
                .then(()=> { 
                    ToastAndroid.showWithGravity(
                        'Pokemon añadido exitosamente',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                    ); 
                });
            this.props.discard();
        });
    }
    borrar = (nombre) => {
        this.props.con.eliminar(nombre)
        .then( () => {
            ToastAndroid.showWithGravity(
                'Pokemon borrado exitosamente',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            ); 
            this.props.con.getPokemons()
            .then( (pokemons) => { 
                this.props.reset(pokemons);
            });
        });
    }

    displayButtons = () => {
        if(this.props.inDB&&!this.props.search){
            return (
                <View>
                    <Button
                        buttonStyle={{ backgroundColor: '#ff0000' }}
                        titleStyle={{ 
                            fontFamily:'Comic',
                            fontWeight:'bold',
                        }}
                        onPress={ () => { this.props.navigation.navigate('Modify',{ pokemon : this.props.pokemon , cons : this.props.con }) } }
                        title="Moridifcar!"
                    />
                    <Button
                        buttonStyle={{ backgroundColor: '#4f0000' }}
                        titleStyle={{ 
                            fontFamily:'Comic',
                            fontWeight:'bold',
                        }}
                        onPress={ () => this.borrar(this.props.pokemon.name) }
                        title="Borrar!"
                    />
                </View>
            );
            
        } 
        if (this.props.inDB && this.props.search) {
            
            return (
                <View>
                    <Button
                        buttonStyle={{ backgroundColor: '#ff0000' }}
                        titleStyle={{ 
                            fontFamily:'Comic',
                            fontWeight:'bold',
                        }}
                        onPress={  this.props.discard } 
                        title="Volver!"
                    />
                </View>
            )
        }
        
        return (
                <View>
                    <Button
                        buttonStyle={{ backgroundColor: '#ff0000' }}
                        titleStyle={{ 
                            fontFamily:'Comic',
                            fontWeight:'bold',
                        }}
                        onPress={ () => this.guardar() }
                        title="Guardar Pokemon!"
                    /> 
                    <Button
                        buttonStyle={{ backgroundColor: '#4f0000' }}
                        onPress={ this.props.discard }
                        title="Descartar!"
                    />
                </View> 
            );
        
    }

    showData = () => {
        if(this.props.inDB&&this.props.search) {
            return(
            <View>
                <Text style={styles.description}>
                    Ya posee a este pokemon, puede ver sus detalles desde sus pokemons!
                </Text>
            </View>
            );
        } 
        else {
            return(
                <View>
                    <Text style={styles.description}>
                        Nombre: {this.props.pokemon.name}
                    </Text>
                    <Text style={styles.description}>
                        Ataque principal: {this.props.pokemon.ataque1}
                    </Text>
                    <Text style={styles.description}>
                        Ataque secundario: {this.props.pokemon.ataque2}
                    </Text>
                    <Text style={styles.description}>
                        Tipo: {this.props.pokemon.type}
                    </Text>
                </View>
            );     
        }
    
    }

    render() {
        return(
        <View>
                <Card
                    title={this.props.pokemon.name.toUpperCase()}
                    image={{uri: this.props.pokemon.img }} 
                    >
                    {this.showData()}
                    {this.displayButtons()}
                </Card>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    description: {
        marginBottom: 10, 
        fontSize: 20, 
        textAlign: 'justify'
    },
});