import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const TimeInput = () => {
    const [time, setTime] = useState("");

    const formatTime = (text: string) => {
        let cleaned = text.replace(/\D/g, "");

        let formatted = cleaned;
        if (cleaned.length > 2) {
            formatted = cleaned.slice(0, 2) + ":" + cleaned.slice(2);
        }
        if (cleaned.length > 4) {
            formatted = formatted.slice(0, 5) + ":" + cleaned.slice(4);
        }

        setTime(formatted);
    };

    return (
            <TextInput
                placeholder="00:00:00"
                keyboardType="numeric"
                value={time}
                onChangeText={formatTime}
                maxLength={8}
                style={styles.text_input}
                placeholderTextColor="rgba(255,255,255,0.4)"
            />
    );
};

const styles = StyleSheet.create({
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

export default TimeInput;
