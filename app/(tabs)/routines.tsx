import RoutineCard from "@/components/RoutineCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

type Excersies = {
  order: number;
  type: "rest" | "warm-up" | "workout";
  duration: number;
};

interface Routine {
  id: string;
  title: string;
  description: string;
  duration: number;
  excersies: Excersies[];
}

export default function Routines() {

  const [routines, setRoutines] = useState<Routine[]>([]);

  const getRoutines = async () => {
    const savedRoutines = await AsyncStorage.getItem("routines");
    if (savedRoutines) {
      setRoutines(JSON.parse(savedRoutines));
    } else {
      const defaultRoutine: Routine = {
        id: "0",
        title: "Default routine",
        description: "Warm-up routine",
        duration: 75,
        excersies: [
          { order: 1, type: "warm-up", duration: 15 },
          { order: 2, type: "workout", duration: 60 },
        ],
      }

      setRoutines([defaultRoutine]);

      await AsyncStorage.setItem("routines", JSON.stringify([defaultRoutine]));
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);


  return (
    <LinearGradient
      colors={["#313B6B", "#030B43"]}
      style={styles.container}
    >
      <Text style={styles.title}>Your routines!</Text>
      <View style={styles.routines}>
        {routines.map((routine, index) => (
          <RoutineCard key={index} title={routine.title} duration={routine.duration} id={routine.id} />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: " #6B5E31 0%, #442800 100%",
    paddingHorizontal: 40,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontFamily: "Red Hat Display",
    marginBottom: 60,
  },
  routines: {
    gap: 16,
  }
});