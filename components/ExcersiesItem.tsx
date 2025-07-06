import { View, StyleSheet, Text, Pressable } from "react-native";

import SvgIcon from "./SvgIcon";
import TrashIcon from "@/assets/icons/trash-icon.svg";
import formatTime from "@/utilities/formatTime";

import { Excersies } from "@/types";
import React, { useState } from "react";
import { EXCERSIES_HEIGHT } from "@/utilities/constants";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Gesture, PanGestureHandler } from "react-native-gesture-handler";

interface Props {
    excersie: Excersies
    order: number
    onRemoveExcersies: (order: number) => void
}

export const ExcersiesItem = ({ excersie, order, onRemoveExcersies }: Props) => {

    const [isDragging, setIsDragging] = useState(false);

    const gestureHandler = useAnimatedGestureHandler({
        onStart() {
            runOnJS(setIsDragging)(true);
        },
        onActive() { },
        onFinish() {
            runOnJS(setIsDragging)(false);
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withSpring(excersie.type === "rest" ? isDragging ? "#4FA04Aff" : "#4FA04A99" : excersie.type === "warm-up" ? isDragging ? "#A47E02ff" : "#A47E0299" : isDragging ? "#923B3Bff" : "#923B3B99"),
            zIndex: isDragging ? 1 : 0,
            position: "absolute",
            left: 0,
            right: 0,
            top: order * (EXCERSIES_HEIGHT + 3),
        }
    }, [isDragging, order]);

    return (
        <Animated.View
            key={order}
            style={[
                styles.excersies,
                
            ]}
        >
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <View collapsable={false}>
                    <Text style={[styles.text]}>{excersie.type}</Text>
                </View>
            </PanGestureHandler>
            <Text style={[styles.text, { color: "rgba(255, 255, 255, 0.8)", marginLeft: "auto", marginRight: 20 }]}>{formatTime(excersie.duration)}</Text>
            <Pressable onPress={() => onRemoveExcersies(excersie.order)} style={({ pressed }) => [{ opacity: pressed ? 1 : 0.8 }]}>
                <SvgIcon width={20} name={TrashIcon} height={20} color="white" />
            </Pressable>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 16,
        fontFamily: "Red Hat Display",
        textTransform: "capitalize",
    },
    excersies: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 13,
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        marginBottom: 5,
    }
})