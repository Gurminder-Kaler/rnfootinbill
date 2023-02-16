import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
//import RequiredSign from '../../utils/requiredSign';
import { loginUser } from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required('Email is required.')
    .email('Not a valid email.'),
  password: Yup.string().required('Password is required.'),
});

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const formObject = { email: '', password: '' };
  // const formObject = { email: 'gurminder@yopmail.com', password: '12345678' };

  let performLogin = async values => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    // let response = await dispatch(loginUser(payload));
    
    // if (response && response.success) {
    //   // AsyncStorage.setItem('userToken', response.token);
    // }
    await dispatch(loginUser(payload));
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          performLogin(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          let { email, password } = values;
          return (
            <>
              <View className="body">
                <View style={styles.brandView}>
                  <Text style={[styles.brandText, styles.shadowSm]}>
                    FootInBill
                  </Text>
                </View>
                <View style={styles.welcomeView}>
                  <Text style={[styles.brandText, styles.welcomeText]}>
                    Welcome, log in into your account
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    placeholder={'Email'}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                  />

                  {touched.email && errors.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder={'Password'}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={[styles.button, styles.shadowSm]}>
                  <TouchableOpacity
                    onPress={
                      isSubmitting == false ? handleSubmit : handleSubmit
                    }>
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                </View>

                <View style="flex w-[90%] justify-end items-end mt-2 mx-auto">
                  <TouchableOpacity
                    style={[styles.button, styles.shadowSm]}
                    onPress={() => navigation.navigate('forgotPasswordScreen')}>
                    <Text style={styles.buttonText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View style="w-90% mx-auto shadow-md bg-primary rounded-sm mt-12">
                  <TouchableOpacity
                    style={styles.signInView}
                    onPress={() => navigation.navigate('registerScreen')}
                  >
                    <Text>Don't have an account? <Text style={styles.signIn}>Sign Up</Text></Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'teal',
    height: 150,
    width: 150,
  },
  brandView: {
    padding: 2,
    marginBottom: 20,
  },
  brandText: {
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: '400',
    fontFamily: 'Pacifico-Regular',
    color: '#EF912C',
  },
  welcomeView: {
    margin: 4,
    padding: 4,
  },
  welcomeText: {
    fontSize: 12,
    color: '#7F8487',
    textAlign: 'center',
  },
  extraInputBox: {
    margin: 35,
  },
  error: {
    color: 'tomato',
    fontSize: 14,
    padding: 5,
    marginTop: 4,
  },
  inputBox: {
    margin: 5,
    padding: 10,
  },
  input: {
    textAlign: 'left',
    fontSize: 20,
    borderRadius: 2,
    padding: 10,
    color: '#413F42',
    borderColor: '#413F42',
    borderWidth: 0.5,
  },
  button: {
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#EF912C',
    borderRadius: 2,
    marginVertical: 10,
  },
  shadowSm: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  normalText: {
    flex: 1,
    justifyContent: 'center',
    color: '#171717',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7F8487',
  },
  signIn: {
    fontWeight: '700',
    color: '#EF912C',
    marginLeft: 4
  },
  signInView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'tomato',
  },
});
export default LoginScreen;
