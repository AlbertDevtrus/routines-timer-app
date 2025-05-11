import uuid from 'react-native-uuid';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AddCounterModal from "@/components/AddCounterModal";
import { ExcersiesList } from "@/components/ExcersiesList";

import { Excersies } from "@/types";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Routine {
    id: string;
    title: string;
    description: string;
    duration: number;
    excersies: Excersies[];
}

export default function AddRoutine() {

    const [routine, setRoutine] = useState<Routine>();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [excersies, setExcersies] = useState<Excersies[]>([]);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const router = useRouter();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${remainingSeconds.toString().length === 1 ? `0${remainingSeconds.toString()}` : remainingSeconds}`;;
    }

    const onRemoveExcersies = (order: number) => {
        const newExcersies = excersies.filter((excersie) => excersie.order !== order);
        const updatedExcersies = newExcersies.map((excersie, index) => ({ ...excersie, order: index + 1 }));

        setExcersies(updatedExcersies);
    }

    const onSaveRoutine = async () => {
        const duration = excersies.reduce((acc, excersie) => acc + excersie.duration, 0);

        const savedRoutines = await AsyncStorage.getItem("routines");
        if (savedRoutines) {
            const routines = JSON.parse(savedRoutines);
            const updatedRoutines = routines.push({
                id: uuid.v4(),
                title,
                description,
                excersies,
                duration
            });

            await AsyncStorage.setItem("routines", JSON.stringify(updatedRoutines));
        }

        router.push("/routines");
    };

    const onAddCounter = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <GestureHandlerRootView >
            <LinearGradient
                colors={["#313B6B", "#030B43"]}
                style={styles.container}
            >
                <View style={styles.input_container}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.text_input} placeholder="Title" placeholderTextColor="rgba(255,255,255,0.4)" value={title} onChangeText={newTitle => setTitle(newTitle)} />
                </View>
                <View style={styles.input_container}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.text_input} placeholder="Description" placeholderTextColor="rgba(255,255,255,0.4)" value={description} onChangeText={newDescription => setDescription(newDescription)} />
                </View>
                <View style={styles.input_container}>
                    <Text style={styles.label}>Edit your routine</Text>
                    <ExcersiesList excersies={excersies} onRemoveExcersies={onRemoveExcersies} />
                </View>
                <Pressable onPress={onAddCounter} style={({ pressed }) => [{ backgroundColor: pressed ? "rgba(0, 5, 5, 0.60)" : "rgba(0, 5, 5, 0.30)" }, styles.button]}>
                    <Text style={[styles.text, { textAlign: "center" }]}>Add Counter</Text>
                </Pressable>
                <View style={styles.buttons_container}>
                    <Pressable onPress={onSaveRoutine} style={({ pressed }) => [{ backgroundColor: pressed ? "rgba(0, 0, 0, 0.60)" : "rgba(0, 0, 0, 0.40)" }, styles.secondary_button]}>
                        <Text style={[styles.text, { textAlign: "center" }]}>Save</Text>
                    </Pressable>
                </View>
                <AddCounterModal isVisible={isModalVisible} onClose={onModalClose} setExcersies={setExcersies} order={excersies.length + 1} />
            </LinearGradient>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: " #6B5E31 0%, #442800 100%",
        paddingHorizontal: 40,
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
    },
    button: {
        display: "flex",
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20,
    },
    secondary_button: {
        paddingVertical: 12,
        borderRadius: 10,
        flex: 1,
    },
    buttons_container: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        gap: 5,
    }
});