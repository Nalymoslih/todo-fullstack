// import {AsyncStorage} from 'react-native-async-storage/async-storage';
import React from 'react';
import COLORS from '../../conts/colors';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [inputs, setInputs] = React.useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError('Email is required', 'email');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      handleError('Email is invalid', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleError('Password is required', 'password');
      valid = false;
    } else if (inputs.password.length < 6) {
      handleError('Password must be at least 6 characters', 'password');
      valid = false;
    }
    if (valid) {
      login();
    }
  };
  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('HomeScreen');
    }, 1000);
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Login
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter your details to Login
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            placeholder="Enter your email adress"
            label="Email"
            onFocus={() => handleError(null, 'email')}
            error={errors.email}
            onChangeText={text => handleOnChange(text, 'email')}
            // error="Input email"
          />

          <Input
            placeholder="Enter your password"
            label="Password"
            // error="Input password"
            password
            onFocus={() => handleError(null, 'password')}
            error={errors.password}
            onChangeText={text => handleOnChange(text, 'password')}
          />
          <Button title="Login" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 18,
              marginVertical: 12,
            }}>
            Don't have an account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
