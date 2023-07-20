import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../../conts/colors';

const Loader = ({visible = false}) => {
  const {height, width} = useWindowDimensions();

  return (
    visible && (
      <View style={[styles.container, {height, width}]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text
            style={{
              marginTop: 25,
              color: COLORS.blue,
              marginLeft: 10,
              fontSize: 16,
            }}>
            Loading...
          </Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    borderRadius: 8,
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 20,
  },
});

export default Loader;
