import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { PropsWithChildren, useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { getSavedRoutines } from '@/utilities/routinesStorage';
import { useRoutines } from '@/hooks/useRoutines';
import RoutineCard from './RoutineCard';
import { Routine } from '@/types';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
    selectRoutine?: any;
    id?: string;
    routines: Routine[];
    activeExcersie?: any
}>;

export default function SelectRoutineModal({ isVisible, onClose, selectRoutine, id, routines, activeExcersie }: Props) {

    const { getRoutine } = useRoutines();

    const scale = useSharedValue(1);
    const animateStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = async (id: string) => {
        const routineSelected = await getRoutine(id);

        selectRoutine(routineSelected);
        activeExcersie(routineSelected?.excersies[0])
        onClose()
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} >
            <View style={styles.modalBackground}>
                <View style={styles.titleContainer}>
                    <Pressable onPress={() => {
                        onClose()
                    }}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.modalContent}>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>Select routine</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.input_container} showsVerticalScrollIndicator={false}>
                        <View style={styles.routines}>
                            {routines.map((routine, index) => (
                                <RoutineCard
                                    key={index}
                                    title={routine.title}
                                    duration={routine.duration}
                                    id={routine.id}
                                    isLink={false}
                                    isPressable={true}
                                    handlePress={() => handlePressIn(routine.id)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    routines: {
        gap: 10,
    },
    modalContent: {
        width: '80%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#313B6B',
        bottom: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
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
