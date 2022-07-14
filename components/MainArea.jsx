import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import Header from './Header';
export default function MainArea() {
	const navigation = useNavigation();

	const [imageList, setImageList] = useState([]);

	async function getImgData(count = 1) {
		const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${count}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;

		const raw = await fetch(URL);
		const res = await raw.json();
		var list = res.photos.photo;
		list = list.map((item) => {
			return { id: item.id, url: item.url_s };
		});

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
		unique.push({});
		setImageList(unique);
		console.log(unique);
		// await storedata(unique);

		console.log(unique.length);
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
		// await retrieveData();
		await getImgData(1);
	}
	useEffect(() => {
		dataHandler();
		// getImgData();
	}, []);

	return (
		<>
			<Header />
			<View style={styles.container}>
				<FlatList
					style={{
						backgroundColor: 'white',
						// width: '100%',
						marginTop: 10,
					}}
					data={imageList}
					numColumns={2}
					renderItem={({ item, index }) =>
						index < imageList.length - 1 ? (
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
						) : (
							<View
								style={{
									padding: 10,
									display: 'flex',
									flexDirection: 'row',
									width: '100%',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<TouchableOpacity
									onPress={async () => await getImgData(1)}
									style={{
										marginHorizontal: 10,
										padding: 6,
										borderRadius: 5,
										backgroundColor: 'orange',
									}}
								>
									<Text>1</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={async () => await getImgData(2)}
									style={{
										marginHorizontal: 10,
										padding: 6,
										borderRadius: 5,
										backgroundColor: 'orange',
									}}
								>
									<Text>2</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={async () => await getImgData(3)}
									style={{
										marginHorizontal: 10,
										padding: 6,
										borderRadius: 5,
										backgroundColor: 'orange',
									}}
								>
									<Text>3</Text>
								</TouchableOpacity>
							</View>
						)
					}
				/>
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		height: '85%',
		width: '100%',
		backgroundColor: '#f5f5f5',
		paddingBottom: 20,
		borderRadius: 20,
	},
	image: {
		width: '100%',
		aspectRatio: 2 / 1.7,
		margin: 2,
		borderRadius: 10,
		backgroundColor: '#ADD8E6',
	},
});
