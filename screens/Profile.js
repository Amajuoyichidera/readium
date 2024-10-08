import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Profile = ({ user, handleAuthentication }) => {
  const bookmarks = useSelector((state) => state.story.bookmarks);
  const isEnabled = useSelector(state => state.story.isEnabled);
  const [selectedBookmark, setSelectedBookmark] = useState(null);


  const validBookmarks = bookmarks.filter(
    bookmark => bookmark && bookmark._id && bookmark.title
  );

  const myBackground = {backgroundColor: isEnabled ? '#121212' : '#FBF7EF'}
  const myColor = {color: isEnabled ? '#E0E0E0' : '#333'}

  return (
    <View style={[styles.container, myBackground]}>
      <Text style={[styles.header, myColor]}>Profile</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userEmail}>User: {user.email}</Text>
        <TouchableOpacity onPress={handleAuthentication}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.bookmarksHeader, myColor]}>Bookmarks</Text>
      
      {validBookmarks.length > 0 ? (
        validBookmarks.map((bookmark) => (
            <View key={bookmark._id}>
              <TouchableOpacity
                style={styles.bookmarkContainer}
                onPress={() => setSelectedBookmark(bookmark)}
              >
                <Text style={styles.bookmarkTitle}>{bookmark.title}</Text>
              </TouchableOpacity>
            </View>
        ))
      ) : (
        <Text style={[styles.noBookmarksText, myColor]}>No Bookmarked Story</Text>
      )}

      {selectedBookmark && (
        <Modal
          animationType="slide"
          visible={!!selectedBookmark}
          onRequestClose={() => setSelectedBookmark(null)}
        >
          <View style={[styles.modalContainer, myBackground]}>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedBookmark.title}</Text>
              <Text style={styles.modalAuthor}>{selectedBookmark.author}</Text>
              <Text style={styles.modalStory}>{selectedBookmark.story}</Text>
              <Text style={styles.modalMoral}>{selectedBookmark.moral}</Text>
              <Button title="Close" onPress={() => setSelectedBookmark(null)} />
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  userEmail: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  logoutButton: {
    color: '#ff5252',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#ffe6e6',
  },
  bookmarksHeader: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  bookmarkContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
  bookmarkTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'blue',
  },
  noBookmarksText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  modalStory: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    lineHeight: 40,
  },
  modalMoral: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 20,
  },
});

export default Profile;
