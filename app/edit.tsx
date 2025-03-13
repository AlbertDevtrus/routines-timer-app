import AddCounterModal from "@/components/AddCounterModal";
import RoutineCard from "@/components/RoutineCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

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

export default function EditRoutine() {

  const [routine, setRoutine] = useState<Routine>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [excersies, setExcersies] = useState<Excersies[]>([]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { routineId } = useLocalSearchParams();
  const router = useRouter();

  const getRoutine = async () => {
    const savedRoutines = await AsyncStorage.getItem("routines");
    if (savedRoutines) {
      const routines = JSON.parse(savedRoutines);
      const selectedRoutine = routines.find((routine: Routine) => routine.id === routineId);

      if (!selectedRoutine) {
        /*
        *
        * 1. If there are no routines  selected redirect to add-routine
        * 
        */
        router.push("/routines");
      }

      setRoutine(selectedRoutine);
      setTitle(selectedRoutine.title);
      setDescription(selectedRoutine.description);
      setExcersies(selectedRoutine.excersies);
    } else {
      router.push("/routines");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds === 0 ? "00" : remainingSeconds}`;;
  }

  const onAddCounter = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getRoutine();
  }, []);

  return (
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
        {excersies.map((excersie, index) => (
          <View
            key={index}
            style={[styles.excersies,
            {
              backgroundColor: excersie.type === "rest" ? "#4FA04A99" : excersie.type === "warm-up" ? "#A47E0299" : "#923B3B99"
            }
            ]}
          >
            <Text style={[styles.text]}>{excersie.type}</Text>
            <Text style={[styles.text, { color: "rgba(255, 255, 255, 0.8)" }]}>{formatTime(excersie.duration)}</Text>
          </View>
        ))}
      </View>
      <Pressable onPress={onAddCounter}>
        <Text style={[styles.text, { marginTop: 20 }]}>Add Counter</Text>
      </Pressable>
      <AddCounterModal isVisible={isModalVisible} onClose={onModalClose}>
        <Text style={[styles.text]}>test</Text>
      </AddCounterModal>
    </LinearGradient>
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
  excersies: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 13,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Red Hat Display",
    textTransform: "capitalize",
  }
});