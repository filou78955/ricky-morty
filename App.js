import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import Header from './components/header';
export default function App() {


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  // call the rick & morty api and set the data with the json.results
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // give the right style name to the render using the item.status
  const colorStatus= (item, style) => {
    let color = "";
    switch (item) {
      case 'Dead':
        color= style.redCircle;
        break;
      case 'Alive':
          color= style.greenCircle;
          break;
      case 'unknown':
          color= style.greyCircle
          break;
      default:
        null;
    }
    return color;
  }
  return (
    <View style={styles.container}>
      <Header
          center={<Text style={{ color: '#7CBC6C', fontSize: 20 }} >Rick & Morty</Text>}
        />
      
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{
                  uri: item.image}}
              />
              <View style={styles.infos}>
                <Text style={styles.name}>{item.name} </Text>
                <Text style={styles.details}>
                  <View style={colorStatus(item.status, styles)}>
                    
                  </View>  {item.status} - {item.species}</Text>
                <Text style={styles.details}>Gendre: {item.gender}</Text>
                <Text style={styles.details}>Origin:  {item.location.name}</Text>

              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  card: {
    flexDirection:"row",
    marginTop: 20,
    maxHeight: 500,
    minHeight: 150,
    width: 380,
    backgroundColor: '#7CBC6C',
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft:'auto',
    marginRight:'auto',
  },
  image:{
    flex:1,
    padding: 30,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  },
  infos:{
    flex:2,
    marginLeft:10,
    marginTop:10,
    flexDirection:'column',
    paddingBottom: 10,
    paddingRight: 10
  },
  name:{
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  details:{
    color:'white',
    marginTop:10,
    fontSize: 10
  },
  redCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor:'#F44040',
  },
  greenCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor:'#59F440',
  },
  greyCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor:'#969595'
  }
});
