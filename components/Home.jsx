import { StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import MainArea from './MainArea';
export default function Home() {
	return (
		<View style={styles.container}>
			<Header />
			<MainArea />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
	},
});
