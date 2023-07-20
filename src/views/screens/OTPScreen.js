import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack';
import {useNavigation} from '@react-navigation/native';
// import HomeScreen from './HomeScreen';
import axios from 'axios';

const OTPScreen = () => {
  const navigation = useNavigation();
  const [otp, setOTP] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleOTPChange = text => {
    setOTP(text);
  };

  const handleSubmit = async () => {
    console.log('test');
    navigation.navigate('HomeScreen');
    if (otp.length === 6) {
      try {
        console.log(handleOTPChange);
        await axios
          .post('http://localhost:3000/api/otp', {
            phoneNumber: null,
            otp: otp,
          })
          .then(res => {
            console.log(res.data);
          });
        // console.log(res.data);
        // Reset the OTP input
        setOTP('');
      } catch (error) {
        console.log(error.message);
      }

      setOTP('');
      Animated.timing(fadeAnim, {toValue: 1, duration: 500}).start(() => {
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
          navigation.navigate('LoginScreen');
        }, 3000);
      });
    } else {
      setSnackbarVisible(false);
    }
  };

  return (
    <View style={{marginTop: 210}}>
      <Animated.View>
        <TextInput
          mode="outlined"
          label="Enter OTP"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={handleOTPChange}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{
            marginTop: 20,
            color: 'red',
            backgroundColor: '#000',
            width: 180,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 100,
          }}>
          Submit
        </Button>
      </Animated.View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}>
        OTP verified successfully
      </Snackbar>
    </View>
  );
};

// const 777 = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f1f1f1',
//   },
//   otpContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   input: {
//     marginBottom: 16,
//   },
//   snackbar: {
//     marginBottom: 16,
//     backgroundColor: '#4caf50',
//   },
// });

export default OTPScreen;
