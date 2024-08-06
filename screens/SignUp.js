import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

const SignUp = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
        <View style={[styles.shape, styles.shape1]} />
        <View style={[styles.shape, styles.shape2]} />

       <Text style={styles.title}>Start reading your favorite books today!</Text>

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor='#3A3967'
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor='#3A3967'
      />
      <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>
         {isLogin ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
    authContainer: {
        height: '100%',
        backgroundColor: '#FBF7EF',
        paddingTop: 200,
        padding: 20,
    },
    title: {
        color: '#3A3967',
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 50,
    },
    input: {
        borderColor: '#E9E0CC',
        borderWidth: 2,
        height: 50,
        borderRadius: 30,
        paddingLeft: 10,
        marginTop: 20
    },
    button: {
        backgroundColor: '#3A3967',
        marginTop: 80,
        height: 50,
        borderRadius: 30,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 12,
    },
    bottomContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    shape: {
        borderRadius: 100,
        position: 'absolute',
    },
    shape1: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        top: 150,
    },
    shape2: {
        width: 150,
        height: 150,
        backgroundColor: '#FFA63E',
        top: 40,
        left: 300,
    },
    toggleText: {
        color: '#3A3967',
        fontSize: 20,
        fontWeight: '400',
    }
})

export default SignUp