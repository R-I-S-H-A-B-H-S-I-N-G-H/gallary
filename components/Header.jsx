import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
	const navigation = useNavigation();

	return (
		<View
			style={{
				// backgroundColor: 'yellow',
				alignItems: 'center',
				padding: 10,
			}}
		>
			<Text
				style={{
					fontWeight: 'bold',
					fontSize: 50,
				}}
			>
				Photos
			</Text>

			<TextInput
				placeholder={'Search '}
				style={{
					marginHorizontal: 10,
					padding: 8,
					width: '90%',
					borderRadius: 10,
					backgroundColor: 'white',
					fontWeight: 'bold',
					// width: '100%',
				}}
				onPressIn={() => {
					navigation.navigate('Search');
				}}
			/>
		</View>
	);
}
