import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import COLORS from '../../conts/colors';

const Input = ({
  label,
  iconName,
  error,
  password,
  placeholder,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
          },
        ]}>
        {/* <iconName name={iconName} /> */}
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{color: COLORS.darkBlue, flex: 1}}
          {...props}
        />
        {password && (
          <Button
            title="Hide"
            onPress={() => setHidePassword(!hidePassword)}
            style={{fontSize: 22, color: COLORS.darkBlue}}
            name={hidePassword ? 'Hide' : 'Unhide'}
          />
        )}
      </View>
      {error && (
        <Text style={{color: COLORS.red, fontSize: 12, marginTop: 7}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 12,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
});

export default Input;
