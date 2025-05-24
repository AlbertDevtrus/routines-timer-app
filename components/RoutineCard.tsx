import formatTime from "@/utilities/formatTime";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    title: string;
    duration: number;
    id: string;
}

export default function RoutineCard({ title, duration, id }: Props) {

    return (
        <Link href={`/edit-routine?routineId=${id}`} style={styles.link}>
            <View style={styles.routine_container}>
                <Text style={styles.routine_text}>{title}</Text>
                <Text style={styles.routine_subtext}>{formatTime(duration)} minutes</Text>
            </View>
        </Link>
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