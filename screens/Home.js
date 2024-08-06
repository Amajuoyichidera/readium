import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
     {/* background shapes */}

      {/* Main Content */}
      <View style={styles.content}>
        
      <View style={[styles.shape, styles.shape1]} />
      <View style={[styles.shape, styles.shape4]} />
      <View style={[styles.shape, styles.shape2]} />
      <View style={[styles.shape, styles.shape3]} />
      <View style={[styles.shape, styles.shape5]} />

        <Text style={styles.title}>All your books in one place on Readium.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Text onPress={() => navigation.navigate('SignUp')} style={styles.loginLink}>Log in</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
      container: {
        height: '100%',
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBF7EF',
      },  
      shape: {
        position: 'absolute',
        backgroundColor: '#3A3967',
        borderRadius: 100,
      },
      shape1: {
        width: 180,
        height: 180,
        top: -210,
        left: -80,
      },
      shape2: {
        width: 120,
        height: 120,
        top: 150,
        right: -50,
      },
      shape3: {
        width: 100,
        height: 100,
        bottom: -120,
        left: -20,
        backgroundColor: '#ffaf00',
      },
      shape4: {
        width: 150,
        height: 150,
        top: -150,
        left: 200,
        backgroundColor: '#ffaf00',
      },
      shape5: {
        backgroundColor: 'white',
        width: 150,
        height: 150,
        top: 100,
        left: 10,
      },
      content: {
        padding: 20,
        alignItems: 'center',
      },
      title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#3A3967',
        marginBottom: 40,
      },
      button: {
        backgroundColor: '#3A3967',
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 30,
        marginBottom: 20,
        width: 300,
        marginTop: 80,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      loginText: {
        fontSize: 20,
        color: '#4c3d3d',
      },
      loginLink: {
        fontSize: 20,
        paddingTop: 10,
        fontWeight: 'bold',
        color: '#3A3967',
      },
})

export default Home