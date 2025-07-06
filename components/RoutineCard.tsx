import formatTime from "@/utilities/formatTime";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
    title: string;
    duration: number;
    id: string;
    isLink?: boolean;
    isPressable?: boolean;
    handlePress?: () => void;
    handlePressOut?: () => void;
    animateStyle?: any;
}

export default function RoutineCard({ title, duration, id, isLink = true, isPressable = false, handlePress, handlePressOut, animateStyle }: Props) {

    return (
        isLink ?  
        <Link href={`/edit-routine?routineId=${id}`} style={styles.link}>
            <View style={styles.routine_container}>
                <Text style={styles.routine_text}>{title}</Text>
                <Text style={styles.routine_subtext}>{formatTime(duration)} minutes</Text>
            </View>
        </Link>
        :
        isPressable ?
        <Pressable onPressIn={handlePress} style={styles.link} onPressOut={handlePressOut}>
            <Animated.View style={[styles.routine_container, animateStyle]}>
                <Text style={styles.routine_text}>{title}</Text>
                <Text style={styles.routine_subtext}>{formatTime(duration)} minutes</Text>
            </Animated.View>
        </Pressable>
        : 
        
        <View style={styles.link}>
            <View style={styles.routine_container}>
                <Text style={styles.routine_text}>{title}</Text>
                <Text style={styles.routine_subtext}>{formatTime(duration)} minutes</Text>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    link: {
        width: "100%",
    },
    routine_container: {
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.20)",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 10,
        gap: 7,
    },
    routine_text: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Red Hat Display",
    },
    routine_subtext: {
        color: "rgba(255, 255, 255, 0.60)",
        fontSize: 12,
        fontFamily: "Red Hat Display",
    },
});