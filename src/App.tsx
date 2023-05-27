/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import { getContentImage, getDataFromPage, image_assets } from './controller/controller';


interface content{
  name:string;
  "poster-image":string
}



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


 const [data, setData] = useState<content[]>([])
 const [page, setPage] = useState(1);
 const [isLoading, setIsLoading] = useState(true);
 const [filteredData, setFilteredData] = useState<content[]>([])
 const [stopLoading, setStopLoading] = useState(false);
 const [showSearch, setShowSearch] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');

 useEffect(() => {
  filterData();
}, [searchQuery, data]);


const getMoreData= (pageNo:number) => {
  setPage((prevPage) => prevPage + 1);
  const newData:any[] = getDataFromPage(pageNo)
  if (newData && newData.length>0) {
    setData((prevData)=>[...prevData,...newData])
  }else{
    setStopLoading(true);
    setIsLoading(false);
  }
  
}

/**
 *Action for Load more content
 *
 */
const handleLoadMore = () => {
  if (!stopLoading) {
    setIsLoading(true);
  console.log("handle load more")
  getMoreData(page+1)
  setIsLoading(false);
  }
};

/**
 *Filter logic
 *
 */
const filterData = () => {
  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredData(filtered);
};


  return (
    <SafeAreaView style={styles.backgroundStyle}>
      
            <View style={styles.searchComponentView}>
              {showSearch ?
                <TextInput
                
                style={styles.searchTextView}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                placeholder="Search"
              />
              : null}
              
              <Pressable
                onPress={()=>{showSearch ? setShowSearch(false) : setShowSearch(true)}}>
                <Image
                  source={image_assets.search}
                  style={styles.searchImage}
                  />
              </Pressable>
              
              </View>
          <FlatList
              data={filteredData}
              numColumns={3}
              renderItem={recyclerView}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
              ListFooterComponent={() => {
                return isLoading ?  <ActivityIndicator/>: null;
              }}
              ListFooterComponentStyle={{marginBottom:20}}
              
            />
    </SafeAreaView>
  );
}

const recyclerView:ListRenderItem<content>  = ({item,index})=>{
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const numColumns = 3; //no.of items in a row
  const itemWidth = screenWidth / numColumns;
  const itemHeight = screenHeight / 4;
  return(
  
  <View style={[{maxWidth:itemWidth-10,maxHeight:itemHeight},styles.card]}>
    <View style={{alignContent:"flex-start"}}>
          <Image 
            resizeMode='stretch' 
            style={{width:itemWidth-10,height:itemHeight-10,borderRadius: 5}} 
            source={getContentImage(item['poster-image'])} defaultSource={image_assets.default}
            onError={()=>{
              console.log('image error');
              return <Image 
                        resizeMode='stretch' 
                        source={image_assets.default} 
                        style={{width:itemWidth-10,height:itemHeight-10,borderRadius: 5,}} 
                      />;
            }} />
                  
          <Text style={{ textAlign: 'left',textAlignVertical:"top", color: 'white',marginTop:5 }}>{item.name}</Text>
          </View>
                  
  </View>
  )
}

const styles = StyleSheet.create({
  backgroundStyle :{
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor:Colors.darker,
    flex:1,
   },
  card: {
    margin: 10,
    marginVertical:30,
    borderRadius: 5,
    marginRight: 0,
    marginBottom:0,
    alignItems:"flex-start"
  },
  cardImage:{
    
  },
  searchComponentView:{
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:10
  },
  searchTextView:{
    borderColor: 'gray',
    borderWidth: 1,
    width:Dimensions.get("screen").width-80
  },
  searchImage:{
    maxWidth:30,maxHeight:30,justifyContent:"center"
  }


});

export default App;
