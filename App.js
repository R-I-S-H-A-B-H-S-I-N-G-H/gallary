import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Photo from './components/Photo';
import Search from './components/Seach';
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Photo' component={Photo} />
				<Stack.Screen name='Search' component={Search} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
	},
});
