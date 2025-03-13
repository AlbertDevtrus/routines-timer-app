import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TypeSelector from './TypeSelector';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function AddCounterModal({ isVisible, children, onClose }: Props) {
    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} >
            <View style={styles.modalBackground}>
                <View style={styles.titleContainer}>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.modalContent}>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>Select type</Text>
                        <TypeSelector />
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>Time</Text>
                        <TextInput style={styles.text_input} placeholder="Time (seconds)" placeholderTextColor="rgba(255,255,255,0.4)" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        width: '80%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#313B6B',
        bottom: 0,
        borderEndEndRadius: 10,
        borderStartEndRadius: 10
    },
    titleContainer: {
        backgroundColor: '#313B6B',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '80%'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: "rgba(255, 255, 255, 0.80)",
        fontSize: 12,
        fontFamily: "Red Hat Display",
    },
    input_container: {
        width: "100%",
        gap: 7,
        marginTop: 20,
    },
    text_input: {
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.20)",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        color: "white",
        fontSize: 16,
        fontFamily: "Red Hat Display",
        
    },
});
