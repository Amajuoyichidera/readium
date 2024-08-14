import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Button, StyleSheet, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStory, selectStory, clearSelectedStory } from '../features/storiesSlice';

const Authorized = ({ user, handleAuthentication }) => {

    const stories = useSelector((state) => state.story.stories);
    const status = useSelector((state) => state.story.status);
    const error = useSelector((state) => state.story.error);
    const dispatch = useDispatch();
    const selectedStory = useSelector((state) => state.story.selectedStory);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchStory());
    }, [dispatch]);

    const handleStoryDetails = (story) => {
        dispatch(selectStory(story));
        setModalVisible(true);
    }

    const handleClearStory = () => {
        dispatch(clearSelectedStory());
        setModalVisible(false);
    }

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

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.read}>Readium</Text>
                <View style={styles.userSection}>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <TouchableOpacity onPress={handleAuthentication}>
                        <Text style={styles.logoutButton}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={stories}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.storyItem} onPress={() => handleStoryDetails(item)}>
                        <Text style={styles.storyTitle}>{item.title}</Text>
                        <Text style={styles.storyAuthor}>By: {item.author}</Text>
                        <Text style={styles.storyMoral}>Moral: {item.moral}</Text>
                    </TouchableOpacity>
                )}
            />

            {selectedStory && (
                <Modal
                    visible={modalVisible}
                    animationType='slide'
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedStory.title}</Text>
                        <Text style={styles.modalAuthor}>By: {selectedStory.author}</Text>
                        <Text style={styles.modalStory}>{selectedStory.story}</Text>
                        <Text style={styles.modalMoral}>Moral Lesson: {selectedStory.moral}</Text>
                        <Button color='#3A3967' title='Close' onPress={handleClearStory} />
                    </ScrollView>
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 16,
        backgroundColor: '#FBF7EF',
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
        color: '#3A3967',
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
        color: '#3A3967',
    },
    logoutButton: {
        color: 'red',
        fontSize: 16,
        fontWeight: '500',
    },
    storyItem: {
        backgroundColor: '#fff',
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
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FBF7EF',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3A3967',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalAuthor: {
        fontSize: 18,
        color: '#3A3967',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalStory: {
        fontSize: 16,
        color: '#6A6A6A',
        marginBottom: 20,
        textAlign: 'justify',
    },
    modalMoral: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A3967',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Authorized;
