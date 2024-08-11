import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native'
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
            <View>
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
                <Text>{item.title}</Text>
                <Text>{item.author}</Text>
                <Text>{item.moral}</Text>
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

export default Authorized