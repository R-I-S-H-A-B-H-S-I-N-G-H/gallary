import { Image, StyleSheet, Text, View } from 'react-native';
export default function Photo({ route }) {
	const data = route.params;
	const url = data.url;
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: url }} />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		aspectRatio: 2 / 2,
		resizeMode: 'contain',
	},
});
