import { StyleSheet, Text, View } from 'react-native';
export default function Header() {
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
		</View>
	);
}
