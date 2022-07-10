import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
const testIMGUTL = 'https://live.staticflickr.com/65535/52206112054_6cf2795aa2_m.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
export default function MainArea() {
	const navigation = useNavigation();

	const [imageList, setImageList] = useState([]);
	const [counter, setcountter] = useState(1);

	async function getImgData() {
		console.log(imageList.length);
		// return;
		if (counter > 10) return;

		const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${counter}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;

		setcountter(counter + 1);
		const raw = await fetch(URL);
		const res = await raw.json();
		var list = res.photos.photo;
		list = list.map((item) => {
			return { id: item.id, url: item.url_s };
		});

		list = [...imageList, ...list];
		const uniqueIds = [];
		const unique = list.filter((element) => {
			const isDuplicate = uniqueIds.includes(element.id);

			if (!isDuplicate) {
				uniqueIds.push(element.id);

				return true;
			}

			return false;
		});
		// console.log(unique);

		setImageList(unique);
		await storedata(unique);

		// console.log(s);
	}
	async function storedata(data) {
		try {
			await AsyncStorage.clear();
			const datastringfy = await JSON.stringify(data);
			await AsyncStorage.setItem('LIST', datastringfy);
			console.log('data saved');
		} catch (error) {
			console.log('error in saving data', error);
			// Error saving data
		}
	}
	async function retrieveData() {
		// return;
		console.log('RETREIVE DATA');
		try {
			// const value = await AsyncStorage.getAllKeys();
			// console.log(value);
			const value = await AsyncStorage.getItem('LIST');
			// console.log(value);
			if (value && value.length > 0) {
				const savedData = await JSON.parse(value);
				// console.log(savedData);
				setImageList(savedData);
			} else {
				await getImgData();
			}
		} catch (error) {
			console.log('ERROE');
			await getImgData();
		}
	}

	async function dataHandler() {
		await retrieveData();
		// await getImgData();
	}
	useEffect(() => {
		dataHandler();
		// getImgData();
	}, []);

	return (
		<View>
			<FlatList
				onEndReached={async () => await getImgData()}
				onEndReachedThreshold={2}
				style={{
					backgroundColor: 'white',
					// width: '100%',
					marginTop: 10,
				}}
				data={imageList}
				numColumns={2}
				renderItem={({ item, index }) => (
					<View
						key={item.id}
						style={{
							width: '50%',
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate('Photo', { url: item.url })}
							style={{ padding: 5 }}
						>
							<Image style={styles.image} source={{ uri: item.url }} />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	image: {
		width: '100%',
		aspectRatio: 2 / 1.7,
		margin: 2,
		borderRadius: 10,
	},
});
