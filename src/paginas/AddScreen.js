import react from "react";
import { View, Text, StyleSheet} from "react-native";

export function AddScreen() {  
    return (
        <View style={styles.container}>
            <Text>Add</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',        
    },
});