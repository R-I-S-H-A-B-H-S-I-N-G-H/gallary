import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	StyleSheet,
	Button,
	TouchableOpacity,
	ScrollView,
	Image,
	FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
var start = true;

export default function Search() {
	const navigation = useNavigation();
	const [textval, settextval] = useState('');
	const [suggestionList, setsuggesions] = useState([]);

	async function getNameList(query) {
		const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search& api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${query}`;
		const raw = await fetch(URL);
		const response = await raw.json();
		// console.log(response.photos.photo);
		setsuggesions(response.photos.photo);
	}
	function textChange(e) {
		settextval(e);
		getNameList(e);
	}

	return (
		<SafeAreaView
			style={{
				width: '100%',
				height: '100%',
				marginVertical: 50,
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<View style={styles.container}>
				<TextInput
					value={textval}
					onChangeText={(e) => textChange(e)}
					style={styles.input}
					placeholder={'Search '}
					autoFocus={true}
				/>
				<FlatList
					style={{
						padding: 10,
						paddingVertical: 5,
						backgroundColor: '#F5F5F5',
						margin: 5,
						borderRadius: 10,
					}}
					data={suggestionList}
					numColumns={2}
					renderItem={({ item, index }) => (
						<View
							key={item.id}
							style={{
								width: '50%',
							}}
						>
							<TouchableOpacity
								onPress={() => navigation.navigate('Photo', { url: item.url_s })}
								style={{ padding: 5 }}
							>
								<Image style={styles.image} source={{ uri: item.url_s }} />
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '80%',
		width: '90%',
		backgroundColor: '#f5f5f5',
		paddingVertical: 20,
		borderRadius: 20,
	},
	button: {
		backgroundColor: 'gray',
		width: 30,
		height: 30,
		borderRadius: 10,
		position: 'absolute',
		top: 10,
		right: 10,
	},
	input: {
		backgroundColor: 'white',
		padding: 10,
		paddingHorizontal: 30,
		margin: 10,
		borderRadius: 10,
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,
	},
	image: {
		width: '100%',
		aspectRatio: 2 / 1.7,
		margin: 2,
		borderRadius: 10,
		backgroundColor: '#ADD8E6',
	},
});
