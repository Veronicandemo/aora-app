import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      // set it to global state
      const result = await getCurrentUser();
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
        <View className='w-full min-h-[82vh] px-4 my-6 justify-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-3xl text-white text-semibold font-psemibold mt-10'>
            Log in to Aora
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-xl text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              className='text-xl font-psemibold text-secondary'
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
