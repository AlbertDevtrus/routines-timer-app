import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient"; // 👈 importa gradient
import formatTime from "@/utilities/formatTime";
import { ITEM_WIDTH } from "@/app/(tabs)";

export default function ExerciesCounter({ excersie, isActive, counter, isLast, isFirst }) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(isActive ? 1.25 : 1, { duration: 100 }),
                },
            ],
        };
    });

    if (isLast && isFirst) {
        isLast = false;
        isFirst = false;
    }

    return (
        <View
            style={[
                styles.exerciseItem,
                isActive ? styles.activeExercise : styles.inactiveExercise,
            ]}
        >
            <Text style={styles.title}>{excersie.type}</Text>
            <View style={styles.counter_container}>
                <Animated.Text style={[styles.counter, animatedStyle]}>
                    {isActive ? formatTime(counter) : formatTime(excersie.duration)}
                </Animated.Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "rgba(255, 255, 255, 0.60)",
        fontSize: 24,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Red Hat Display",
        marginTop: 80,
        textTransform: "capitalize"
    },
    counter: {
        fontSize: 48,
        color: "white",
        fontFamily: "Red Hat Display",
        transitionDuration: "200ms",
    },
    counter_container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 150,
        marginBottom: 110,
    },
    exerciseItem: {
        width: ITEM_WIDTH,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: 40,
    },
    activeExercise: {
        opacity: 1,
    },
    inactiveExercise: {
        opacity: 0.2,
    },
});
