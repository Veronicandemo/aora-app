import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      // set result to global state using context
      setUser(result);
      setIsLogged(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] px-4 my-6 justify-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-3xl text-white text-semibold font-psemibold mt-10'>
            Sign Up
          </Text>
          <FormField
            title='Username'
            value={form.username}
            otherStyles='mt-10'
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />
          <FormField
            title='Email'
            value={form.email}
            otherStyles='mt-7'
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            otherStyles='mt-7'
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-xl text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              className='text-xl font-psemibold text-secondary'
            >
              Signin
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
