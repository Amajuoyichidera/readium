import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStory, fetchStoryDetails, clearSelectedStory } from '../features/storiesSlice';

const Authorized = ({user, handleAuthentication}) => {
    
    const stories = useSelector((state) => state.story.stories);
    const status = useSelector((state) => state.story.status);
    const error = useSelector((state) => state.story.error);
    const dispatch = useDispatch();
    const selectedStory = useSelector((state) => state.story.selectedStory)
    
    const handleStoryDetails = (id) => {
        dispatch(fetchStoryDetails(id))
    }

    const handleClearStory = () => {
        dispatch(clearSelectedStory())
    }


    useEffect(() => {
        dispatch(fetchStory());
      }, [dispatch]);

    if(status === 'loading') {
        return (
            <View style={styles.loader}>
                <ActivityIndicator color='black' size='large' />
            </View>
        )
    }

    if(status === 'failed') {
        return (
            <View>
                <Text>Error: {error}</Text>
            </View>
        )
    }

  return (
    <View style={{paddingTop: 200}}>
      <View>
        <Text style={{color: 'purple'}}>Readium</Text>
        <Text>{user.email}</Text>

        <FlatList
        data={stories}
        keyExtractor={(item) => (item.id ? item.id.toString(): Math.floor(Math.random * 100).toString())}
        renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleStoryDetails(item.id)}>
                <Text>Title: {item.title}</Text>
                <Text>Author: {item.author}</Text>
                <Text>Moral Lesson: {item.moral}</Text>
            </TouchableOpacity>
        )}
        />

        {selectedStory && (
            <View>
                <Text>{selectedStory.title}</Text>
                <Text>{selectedStory.author}</Text>
                <Text>{selectedStory.story}</Text>
                <Text>{item.moral}</Text>
                <Button title='close' onPress={handleClearStory} />
            </View>
        )}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontWeight: 'bold',
    },
    storyDetails: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: 16,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Authorized