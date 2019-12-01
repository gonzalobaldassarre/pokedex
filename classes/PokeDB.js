const SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({name : "pokemon.db"});

export default class PokeDB {
    
    constructor(props){  }; 
    
    generarTabla(){
        return new Promise((resolve,reject) => {
            db.transaction((tx) => {
                let query = "CREATE TABLE IF NOT EXISTS pokemons (nombre TEXT NOT NULL UNIQUE, ataquePrimario TEXT NOT NULL, ataqueSecundario TEXT NOT NULL, tipo TEXT NOT NULL, img TEXT NOT NULL);";
                tx.executeSql(query,[],(tx, result)=>{
                    console.log(tx, result);
                    resolve(true);
                }, 
                (err) => {
                    console.log(err);
                    reject(false);
                });
            });
        }); 
    };

    insertar(nombre,ataqueP,ataqueS,tipo,img) {
        return new Promise((resolve,reject) => {
            db.transaction((tx) => {
                let query = "INSERT into pokemons (nombre, ataquePrimario, ataqueSecundario, tipo, img) VALUES(?,?,?,?,?)";
                tx.executeSql(query,[nombre.toLowerCase(),ataqueP,ataqueS,tipo,img],(tx, result)=>{
                    console.log(tx, result);
                    resolve(true);
                }, 
                (err) => {
                    console.log(err);
                    reject(false);
                });
            });
        });
    };

    getPokemons = () => {
        let query = 'select * from pokemons';
        let params = [];
        
        return  new Promise((resolve, reject) => {
            db.transaction((tx) => {

                console.log('getting into transaction');
                
                tx.executeSql(query,params, (tx, results) => {
                        var len = results.rows.length;
                        let pokemons=[];

                        for (let i = 0; i < len; i++) {
                            console.log(results.rows.item(i));
                            let row = results.rows.item(i);
                            pokemons.push(row);
                        }

                        resolve(pokemons);

                },
                (error) => {
                    console.log('error ',error);
                    resolve([]);
                });
            });
        });
    };

    eliminar(nombre){
        return new Promise ((resolve, reject) =>{
            db.transaction( (tx) => {
                let query = "DELETE FROM pokemons WHERE nombre = (?)";
                tx.executeSql(query,[nombre],(tx, result)=>{
                    resolve(result);
                });
            });
        });
    };

    update(pokemon){
        return new Promise ((resolve, reject) =>{
            db.transaction( (tx) => {
                let query = "UPDATE pokemons SET ataquePrimario = (?), ataqueSecundario = (?), tipo = (?) WHERE nombre = (?)";
                tx.executeSql(
                    query,
                    [pokemon.ataque1,pokemon.ataque2,pokemon.tipo, pokemon.name.toLowerCase()],
                    (tx, result)=>{
                        resolve(result);
                    });
            });
        });
    };
}