import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Button, StyleSheet, Modal } from 'react-native'
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStory, selectStory, clearSelectedStory } from '../features/storiesSlice';

const Authorized = ({user, handleAuthentication}) => {
    
    const stories = useSelector((state) => state.story.stories);
    const status = useSelector((state) => state.story.status);
    const error = useSelector((state) => state.story.error);
    const dispatch = useDispatch();
    const selectedStory = useSelector((state) => state.story.selectedStory)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        dispatch(fetchStory());
      }, [dispatch]);

    const handleStoryDetails = (story) => {
        dispatch(selectStory(story))
    }
    

    const handleClearStory = () => {
        dispatch(clearSelectedStory())
    }

    if(status === 'loading') {
        return (
            <View style={styles.loader}>
                <ActivityIndicator color='black' size='large' />
            </View>
        )
    }

    if(status === 'failed') {
        return (
            <View style={{marginTop: 200}}>
                <Text>Error: {error}</Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: 'purple'}}>Readium</Text>
        <View>
        <Text>{user.email}</Text>
        <TouchableOpacity onPress={handleAuthentication}>
            <Text>Logout</Text>
        </TouchableOpacity>
        </View>

        <FlatList
        data={stories}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => {
            return (
                <TouchableOpacity onPress={() => handleStoryDetails(item)}>
                    <Text>Title: {item.title}</Text>
                    <Text>Author: {item.author}</Text>
                    <Text>Moral Lesson: {item.moral}</Text>
                </TouchableOpacity>
            );
        }}
        />
         
        {selectedStory && (
            <Modal
            animationType='slide'
            onRequestClose={() => setModalVisible(!modalVisible)}>
               <View style={{marginTop: 200}}>
                   <Text>Title: {selectedStory.title}</Text>
                   <Text>Author: {selectedStory.author}</Text>
                   <Text>Story: {selectedStory.story}</Text>
                   <Text>Moral Lesson: {selectedStory.moral}</Text>
                   <Button title='close' onPress={handleClearStory} />
               </View>
            </Modal>
        )}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      padding: 16,
      backgroundColor: '#FBF7EF'
    },
    // loader: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
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