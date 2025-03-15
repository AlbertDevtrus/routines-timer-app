import RestIcon from "@/assets/icons/rest-coffee-icon.svg";
import WorkoutIcon from "@/assets/icons/workout-icon.svg";
import WarmUpIcon from "@/assets/icons/warm-up-icon.svg";

import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SvgIcon from "./SvgIcon";

interface Props {
    setType: (type: "rest" | "warm-up" | "workout") => void;
}

export default function TypeSelector({ setType }: Props) {
    const [selectedType, setSelectedType] = useState<"rest" | "warm-up" | "workout" | null>(null);

    const animatedStyle = (type: "rest" | "warm-up" | "workout") =>
        useAnimatedStyle(() => ({
            flex: selectedType === type ? withTiming(2, { duration: 300 }) : withTiming(1, { duration: 300 })
        })
    );

    const restFlex = useSharedValue(1);
    const warmUpFlex = useSharedValue(1);
    const workoutFlex = useSharedValue(1);

    const handlePress = (type: "rest" | "warm-up" | "workout") => {
        setSelectedType(type);
        setType(type);
        restFlex.value = withTiming(type === "rest" ? 2 : 1, { duration: 150 });
        warmUpFlex.value = withTiming(type === "warm-up" ? 2 : 1, { duration: 150 });
        workoutFlex.value = withTiming(type === "workout" ? 2 : 1, { duration: 150 });
    };

    const restAnimatedStyle = useAnimatedStyle(() => ({
        flex: restFlex.value,
    }));

    const warmUpAnimatedStyle = useAnimatedStyle(() => ({
        flex: warmUpFlex.value,
    }));

    const workoutAnimatedStyle = useAnimatedStyle(() => ({
        flex: workoutFlex.value,
    }));

    return (
        <View style={styles.routine_container}>
            <Animated.View style={restAnimatedStyle}>
                <Pressable onPress={() => handlePress("rest")} style={({ pressed }) => [
                    styles.type_container,
                    styles.rest_container,
                    selectedType === "rest" && styles.rest_container_selected,
                    pressed && styles.pressed,
                ]}>
                    <SvgIcon width={25} name={RestIcon} height={25} color="white" />
                    <Text style={[styles.type_text, selectedType !== 'rest' && styles.hide]}>Rest</Text>
                </Pressable>
            </Animated.View>
            <Animated.View style={warmUpAnimatedStyle}>
                <Pressable onPress={() => handlePress("warm-up")} style={({ pressed }) => [
                    styles.type_container,
                    styles.warmup_container,
                    selectedType === "warm-up" && styles.warmup_container_selected,
                    pressed && styles.pressed,
                ]}>
                    <SvgIcon width={25} name={WarmUpIcon} height={25} color="white" />
                    <Text style={[styles.type_text, selectedType !== 'warm-up' && styles.hide]}>Warm-Up</Text>
                </Pressable>
            </Animated.View>
            <Animated.View style={workoutAnimatedStyle}>
                <Pressable onPress={() => handlePress("workout")} style={({ pressed }) => [
                    styles.type_container,
                    styles.workout_container,
                    selectedType === "workout" && styles.workout_container_selected,
                    pressed && styles.pressed,
                ]}>
                    <SvgIcon width={25} name={WorkoutIcon} height={25} color="white" />
                    <Text style={[styles.type_text, selectedType !== 'workout' && styles.hide]}>Workout</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    routine_container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        gap: 4,
    },
    type_text: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Red Hat Display",
        textAlign: "center",
    },
    type_container: {
        flexDirection: "row",
        gap: 10,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    pressed: {
        opacity: 0.8,
    },
    rest_container: {
        backgroundColor: "rgba(79, 160, 74, 0.60)",
    },
    warmup_container: {
        backgroundColor: "rgba(164, 126, 2, 0.60)",
    },
    workout_container: {
        backgroundColor: "rgba(146, 59, 59, 0.60)",
    },
    rest_container_selected: {
        backgroundColor: "#4FA04A",
    },
    warmup_container_selected: {
        backgroundColor: "#A47E02",
    },
    workout_container_selected: {
        backgroundColor: "#923B3B",
    },
    hide: {
        display: "none",
    }
});
