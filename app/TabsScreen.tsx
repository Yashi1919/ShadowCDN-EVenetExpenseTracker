import * as React from 'react';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';
import { TextInput } from 'react-native-gesture-handler';

export default function TabsScreen() {
  const [value, setValue] = React.useState('login'); // Default tab is 'Login'
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const router = useRouter(); // Use router for navigation

  const USER_CREDENTIALS_KEY = '@user_credentials';

  // Save user credentials in AsyncStorage
  const saveUserCredentials = async (username: string, password: string) => {
    try {
      const userData = { username, password };
      await AsyncStorage.setItem(USER_CREDENTIALS_KEY, JSON.stringify(userData));
      Alert.alert('Success', 'User registered successfully!');
    } catch (error) {
      console.error('Error saving user credentials:', error);
      Alert.alert('Error', 'Could not register user.');
    }
  };

  // Authenticate user
  const authenticateUser = async (username: string, password: string) => {
    try {
      const storedData = await AsyncStorage.getItem(USER_CREDENTIALS_KEY);
      if (storedData) {
        const { username: storedUsername, password: storedPassword } = JSON.parse(storedData);
        if (storedUsername === username && storedPassword === password) {
          Alert.alert('Success', 'Login successful!');
          router.push('/main'); // Navigate to the Main screen
        } else {
          Alert.alert('Error', 'Invalid username or password.');
        }
      } else {
        Alert.alert('Error', 'No user registered.');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      Alert.alert('Error', 'Could not log in.');
    }
  };

  return (
    <View className="flex-1 justify-center p-6">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="login" className="flex-1">
            <Text>Login</Text>
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex-1">
            <Text>Sign Up</Text>
          </TabsTrigger>
        </TabsList>

        {/* Login Tab Content */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to log in.</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 native:gap-2">
              <View className="gap-1">
                
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                 
                />
              </View>
              <View className="gap-1">
               
                <Input
                style={
                  {borderBottomWidth: 1,
                  borderColor:"#fff",}
                }
                  id="password"
                  placeholder="********"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button onPress={() => authenticateUser(username, password)}>
                <Text>Login</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Sign Up Tab Content */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create a new account by filling out the form below.</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 native:gap-2">
              <View className="gap-1">
                <Label nativeID="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View className="gap-1">
                <Label nativeID="password">Password</Label>
                <Input
                  id="password"
                  placeholder="********"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <View className="gap-1">
                <Label nativeID="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="********"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button
                onPress={() => {
                  if (password === confirmPassword) {
                    saveUserCredentials(username, password);
                  } else {
                    Alert.alert('Error', 'Passwords do not match.');
                  }
                }}
              >
                <Text>Sign Up</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
