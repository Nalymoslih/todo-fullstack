// import AsyncStorage from 'react-native-async-storage/async-storage';
import {View, Text, SafeAreaView, ScrollView, Keyboard} from 'react-native';
import React from 'react';
import COLORS from '../../conts/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-gesture-handler';
import Input from '../components/input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/Loader';
import axios from 'axios';

const RegistrationScreen = () => {
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
    if (!inputs.fullName) {
      handleError('Full name is required', 'fullName');
      valid = false;
    } else if (inputs.fullName.length < 3) {
      handleError('Full name must be at least 3 characters', 'fullName');
      valid = false;
    }
    if (!inputs.email) {
      handleError('Email is required', 'email');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      handleError('Email is invalid must be contain @', 'email');
      valid = false;
    }
    if (!inputs.phoneNumber) {
      handleError('Phone number is required', 'phoneNumber');
      valid = false;
    } else if (inputs.phoneNumber.length < 10) {
      handleError('Phone number must be at least 10 characters', 'phoneNumber');
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
      Register();
      navigation.navigate('OTPScreen');
    }
  };
  const Register = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        await axios
          .post('http://localhost:3000/api/otp', {
            phoneNumber: inputs.phoneNumber,
          })
          .then(res => {
            console.log(res.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    }, 2000);
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
          Register
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter your details to continue
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            placeholder="Enter your full name"
            label="Full Name"
            onFocus={() => handleError(null, 'fullName')}
            error={errors.fullName}
            onChangeText={text => handleOnChange(text, 'fullName')}
          />
          <Input
            placeholder="Enter your email adress"
            label="Email"
            onFocus={() => handleError(null, 'email')}
            error={errors.email}
            onChangeText={text => handleOnChange(text, 'email')}
            // error="Input email"
          />
          <Input
            placeholder="Enter your phone number"
            label="Phone Number"
            keyboardType="numeric"
            onFocus={() => handleError(null, 'phoneNumber')}
            error={errors.phoneNumber}
            onChangeText={text => handleOnChange(text, 'phoneNumber')}
            // error="Input email"
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            // error="Input pa39828ssword"
            password
            onFocus={() => handleError(null, 'password')}
            error={errors.password}
            onChangeText={text => handleOnChange(text, 'password')}
          />
          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 18,
              marginVertical: 12,
            }}>
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
