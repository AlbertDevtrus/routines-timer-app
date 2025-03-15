import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { PropsWithChildren, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TypeSelector from './TypeSelector';
import { Excersies } from '@/types';
import TimeInput from './TimeInput';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
    setExcersies: (excersies: Excersies[]) => void;
    order: number;
}>;

export default function AddCounterModal({ isVisible, onClose, setExcersies, order }: Props) {
    const [type, setType] = useState<"rest" | "warm-up" | "workout" | null>(null);
    const [time, setTime] = useState<number | null>(null);

    const handlePress = () => {
        if (type && time) {
            setExcersies((prevState: Excersies[]) => [
                ...prevState,
                { order, type, duration: time }
            ]);
            setTime(null);
            setType(null);
            onClose();
        }
    }

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} >
            <View style={styles.modalBackground}>
                <View style={styles.titleContainer}>
                    <Pressable onPress={() => {
                        onClose()
                        setTime(null)
                        setType(null)
                    }}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.modalContent}>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>Select type</Text>
                        <TypeSelector setType={setType} />
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>Time</Text>
                        <TimeInput />
                        <TextInput inputMode='numeric' keyboardType="numeric" style={styles.text_input} placeholder="Time (seconds)" placeholderTextColor="rgba(255,255,255,0.4)" value={time ? time?.toString(): ""} onChangeText={(Text) => setTime(Number(Text))} />
                    </View>
                    <View>
                        <Pressable onPress={handlePress} style={({ pressed }) => [{ backgroundColor: pressed ? "rgba(0, 5, 5, 0.40)" : "rgba(0, 5, 5, 0.20)" }, styles.button]}>
                            <Text style={styles.text}>Add</Text>
                        </Pressable>
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
    text: {
        color: "white",
        fontSize: 16,
        fontFamily: "Red Hat Display",
        textTransform: "capitalize",
        textAlign: "center",
    },
    button: {
        display: "flex",
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20,
    }
});
