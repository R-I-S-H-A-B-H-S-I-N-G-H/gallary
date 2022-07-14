import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from './Header';
import MainArea from './MainArea';
export default function Home() {
	return (
		<SafeAreaView style={styles.container}>
			<MainArea />
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		// padding: 10,
	},
});
