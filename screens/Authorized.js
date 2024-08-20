import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Share, StyleSheet, Modal, ScrollView, Switch } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStory, selectStory, clearSelectedStory, markAsRead, toggleBookmark, setInitialData, toggleDarkMode } from '../features/storiesSlice';
import { getData } from '../storageUtilis';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Authorized = () => {
    
    const stories = useSelector((state) => state.story.stories);
    const status = useSelector((state) => state.story.status);
    const error = useSelector((state) => state.story.error);
    const dispatch = useDispatch();
    const selectedStory = useSelector((state) => state.story.selectedStory);
    const [modalVisible, setModalVisible] = useState(false);
    const readStories = useSelector(state => state.story.readStories);
    const bookmarks = useSelector((state) => state.story.bookmarks);
    const isEnabled = useSelector(state => state.story.isEnabled);

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechPaused, setSpeechPaused] = useState(false);

    const toggleSwitch = () => {
        dispatch(toggleDarkMode())
    }

    useEffect(() => {
        dispatch(fetchStory());

        const loadInitialData = async () => {
            // const readStoriesData = await getData('readStory');
            const bookmarksData = await getData('bookmarks');
            // dispatch(setInitialData({ readStories: readStoriesData, bookmarks: bookmarksData }))
            dispatch(setInitialData({ bookmarks: bookmarksData }))
        };

        loadInitialData();
    }, [dispatch]);

    const handleStoryDetails = (story) => {
        dispatch(selectStory(story));
        dispatch(markAsRead(story._id))
        setModalVisible(true);
    }

    const handleClearStory = () => {
        dispatch(clearSelectedStory());
        setModalVisible(!modalVisible);
        Speech.stop();
        setIsSpeaking(false);
    }

    const handleBookmark = (story) => {
        dispatch(toggleBookmark(story))
    }

    const handleShareStory = async () => {
        try {
            await Share.share({
                message: `Check out this story: "Title: ${selectedStory.title}" by ${selectedStory.author}. \n\nStory: ${selectedStory.story}\n\n Moral: ${selectedStory.moral}`,
                title: selectedStory.title,
            });
        } catch (error) {
            console.error('Error sharing story:', error);
        }
    };

    if (status === 'loading') {
        return (
            <View style={styles.loader}>
                <ActivityIndicator color='#3A3967' size='large' />
            </View>
        )
    }

    if (status === 'failed') {
        return (
            <View style={{ marginTop: 200, alignItems: 'center' }}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        )
    }

    const handleSpeak = () => {
        if (speechPaused) {
            setSpeechPaused(false);
            Speech.resume();
        } else {
            const textToSpeak = `Title, ${selectedStory.title},  Author, ${selectedStory.author},   Story, ${selectedStory.story},  moral, ${selectedStory.moral}`;
            Speech.speak(textToSpeak, {
                onDone: () => setIsSpeaking(false),
                onStopped: () => setIsSpeaking(false),
                onError: () => setIsSpeaking(false),
                pitch: 0.70,
                rate: 0.75,
            });
            setIsSpeaking(true);
        }
    }

    const handlePause = () => {
        if (isSpeaking) {
            Speech.pause();
            setSpeechPaused(true);
        }
    }

    const myColor = {color: isEnabled ? '#E0E0E0' : '#3A3967'}
    const myBackground = {backgroundColor: isEnabled ? '#121212' : '#FBF7EF'}
    const myColor2 = {color: isEnabled ? '#E0E0E0' : '#3A3967'}

    return (
        <View style={[styles.container, myBackground]}>
            <View style={styles.top}>
                <Text style={[styles.read, myColor]}>Readium</Text>
                <View style={styles.userSection}>
                    <Switch
                    trackColor={{false: '#121212', true: '#FBF7EF'}}
                    thumbColor={isEnabled ? '#121212' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}  />
                </View>
            </View>

            <FlatList
                data={stories}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => {
                    const isRead = readStories.includes(item._id);
                    const isBookmarked = bookmarks.find(bookmark => bookmark._id === item._id)

                    return (
                        <TouchableOpacity style={[styles.storyItem, {backgroundColor: isEnabled ? '#E0E0E0' : '#fff' }]} onPress={() => handleStoryDetails(item)}>
                        <Text style={[styles.storyTitle, isRead ? styles.readText : null]}>{item.title}</Text>
                        <Text style={styles.storyAuthor}>By: {item.author}</Text>
                        <Text style={styles.storyMoral}>Moral: {item.moral}</Text>
                           <TouchableOpacity onPress={() => handleBookmark(item)}>
                                <Text style={styles.bookmark}>
                                    {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                                </Text>
                            </TouchableOpacity>
                       </TouchableOpacity>
                    );
                }}
            />
            
            {selectedStory && (
                <Modal
                    visible={modalVisible}
                    animationType='slide'
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                    <View style={[myBackground, {height: '100%'}]}>
                    <ScrollView contentContainerStyle={[styles.modalContent]}>
                    <Text style={[styles.modalTitle, myColor2]}>{selectedStory.title}</Text>
                        <Text style={[styles.modalAuthor, myColor2]}>By: {selectedStory.author}</Text>
                        <Text style={[styles.modalStory, {color: isEnabled ? '#fff' : '#6A6A6A'}]}>{selectedStory.story}</Text>
                        <Text style={[styles.modalMoral, myColor2]}>Moral Lesson: {selectedStory.moral}</Text>


                        <View style={styles.controls}>
                            <TouchableOpacity onPress={handleSpeak} style={styles.iconButton}>
                                <Icon name={isSpeaking && !speechPaused ? 'pause-circle-filled' : 'play-arrow'} size={30} color="#1e90ff" />
                            </TouchableOpacity>
                            {isSpeaking && <TouchableOpacity onPress={handlePause} style={styles.iconButton}>
                                <Icon name="pause-circle-filled" size={30} color="orange" />
                            </TouchableOpacity>}
                            <TouchableOpacity onPress={handleShareStory} style={styles.iconButton}>
                                <Icon name="share" size={30} color="#4CAF50" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleClearStory} style={styles.iconButton}>
                                <Icon name="close" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    </View>
                </Modal>
            )}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 16,
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    read: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    userSection: {
        alignItems: 'flex-end',
    },
    userEmail: {
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: '500',
    },
    storyItem: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 2,
    },
    storyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3A3967',
        marginBottom: 5,
    },
    storyAuthor: {
        fontSize: 16,
        color: '#3A3967',
        marginBottom: 5,
    },
    storyMoral: {
        fontSize: 16,
        color: '#3A3967',
        fontStyle: 'italic',
    },
    modalContent: {
        padding: 20,
        paddingTop: 70,
        paddingBottom: 50,
        // height: 'auto',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    modalAuthor: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    modalStory: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'justify',
        lineHeight: 40,
        paddingTop: 20,
        paddingBottom: 30,
    },
    modalMoral: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'capitalize',
        lineHeight: 25,
        fontStyle: 'italic',
    },
    readText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    bookmark: {
        fontSize: 20,
        color: 'blue',
        marginTop: 8,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    iconButton: {
        marginHorizontal: 10,
    }
});

export default Authorized;
