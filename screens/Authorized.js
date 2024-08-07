import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStory } from '../features/storiesSlice';

const Authorized = ({user, handleAuthentication}) => {
    const stories = useSelector((state) => state.story.stories);
    const status = useSelector((state) => state.story.status);
    const error = useSelector((state) => state.story.error);
    const dispatch = useDispatch();

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
        <Text>Readium</Text>
        <Text>{user.email}</Text>

        <FlatList
        data={stories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <View>
                <Text>{item.title}</Text>
            </View>
        )}
        />
      </View>
    </View>
  )
}

export default Authorized