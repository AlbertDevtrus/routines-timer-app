import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import formatTime from "@/utilities/formatTime";
import { ITEM_WIDTH } from "@/app/(tabs)";

interface Props {
    excersie: any,
    isActive: boolean,
    counter: number,
}

export default function ExerciesCounter({ excersie, isActive, counter }: Props) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withTiming(isActive ? 1.5 : 1, { duration: 100 }) },
                { translateY: withTiming(isActive ? 0 : 10, { duration: 100 }) },
            ],
        };
    });

    return (
        <View
            style={[
                styles.exerciseItem,
                isActive ? styles.activeExercise : styles.inactiveExercise,
            ]}
        >
            <Text style={[styles.title, isActive ? "" : styles.inactiveTitle]}>{excersie.type}</Text>
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
        fontSize: 40,
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
    inactiveTitle: {
        opacity: 0,
    }
});
