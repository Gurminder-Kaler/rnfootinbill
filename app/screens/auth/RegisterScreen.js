import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import RequiredSign from '../../utils/RequiredSign';
import RNPickerSelect from 'react-native-picker-select';
import { registerUser } from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Full Name is required!')
    .trim()
    .min(4, 'More than 3 characters only!'), 
  email: Yup.string().required('Email is required!').email('Invalid email!'),
  password: Yup.string()
    .required('Password is required!')
    .trim()
    .min(8, 'Password is too short!'),
  confirmPassword: Yup.string()
    .required('Confirm password is required!')
    .trim()
    .equals([Yup.ref('password'), null], 'Passwords do not match eachother!'),
});

export const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const formObject = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // name: 'guru',
    // email: 'guru2@yopmail.com',
    // password: '12345678',
    // confirmPassword: '12345678',
  };

  let performRegister = async values => {
    let payload = {
      name: values.name, 
      email: values.email,
      password: values.password, 
    };
    
    await dispatch(registerUser(payload));
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          
          performRegister(values);
        }}>

        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeText}>
                  Please provide details below to create account
                </Text>
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  // value={formObject.name}
                  placeholder={'Name'}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  autoCapitalize="none"
                />
                {touched.name && errors.name ? (
                  <Text style={styles.error}>{errors.name}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  // value={formObject.email}
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
                  // value={formObject.password}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={'Create password'}
                  secureTextEntry={true}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : (
                  ''
                )}
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  // value={formObject.confirmPassword}
                  autoCapitalize="none"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={'Confirm password'}
                  secureTextEntry={true}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                ) : (
                  ''
                )}
              </View>
              <View style={[styles.button, styles.shadowSm]}>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
      <View style={[styles.inputBox, styles.signUpView]}>
        <Text style={styles.bottomText}>Already a member?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
          <Text style={styles.signUp}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const pickerStyle = {
  inputIOS: {
    color: 'teal',
    paddingVertical: 4,
    borderRadius: 5,
    fontWeight: '700',
    fontSize: 16,
  },
  placeholder: {
    color: '#888888',
  },
  inputAndroid: {
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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
  },
  brandText: {
    fontSize: 48,
    textAlign: 'center',
    letterSpacing: 4,
    color: '#EF912C',
  },
  welcomeView: {
    margin: 4,
    padding: 4,
  },
  welcomeText: {
    color: '#666666',
    textAlign: 'center',
  },
  inputBox: {
    margin: 5,
    padding: 10,
  },
  error: {
    color: 'tomato',
    fontSize: 14,
    padding: 5,
    marginTop: 4,
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
  bottomText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7F8487',
  },
  signUp: {
    fontWeight: '700',
    color: '#EF912C',
    marginLeft: 4,
  },
  signUpView: {
    margin: 0,
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

export default RegisterScreen;
