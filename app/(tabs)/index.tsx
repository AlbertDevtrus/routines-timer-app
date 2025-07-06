import { useFonts } from "expo-font";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { getSavedRoutines } from "@/utilities/routinesStorage";
import SelectRoutineModal from "@/components/SelectRoutineModal";
import { useRoutines } from "@/hooks/useRoutines";
import { Routine } from "@/types";
import RoutineCard from "@/components/RoutineCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Timer() {

  const [fontsLoaded] = useFonts({
    "Red Hat Display": require("@/assets/fonts/RedHatDisplay-Regular.ttf"),
  });
  const [counter, setCounter] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const { routines, setRoutines } = useRoutines();

  const scale = useSharedValue(1);
  const animateStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    setIsModalVisible(true);
    scale.value = withSpring(0.97, { damping: 10 });
    setCounter(counter + 1);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };


  useEffect(() => {
    const fetchRoutines = async () => {
      const savedRoutines = await getSavedRoutines();

      setRoutines(savedRoutines);

      const firstRoutine = savedRoutines[0];
      setSelectedRoutine(firstRoutine)
    };

    fetchRoutines();

  }, []);

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={["#6B5E31", "#442800"]}
        style={styles.container}
      >
        <Text style={styles.title}>Warm-up</Text>
        <View style={styles.counter_container}>
          <Text style={styles.counter}>15:00</Text>
        </View>
        {
          selectedRoutine && (
            <RoutineCard duration={selectedRoutine?.duration} id={selectedRoutine.id} title={selectedRoutine.title} isLink={false} isPressable={true} handlePress={handlePressIn} handlePressOut={handlePressOut} animateStyle={animateStyle} />
          )
        }
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.button, animateStyle]}>
            <Ionicons name="play-outline" size={50} color="white" />
          </Animated.View>
        </Pressable>
        <Ionicons name="pause-outline" size={40} color="white" />
        <Text style={styles.routine_text}>{counter}</Text>
        <View>
          <SelectRoutineModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} routines={routines} selectRoutine={setSelectedRoutine} />
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: " #6B5E31 0%, #442800 100%",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    color: "rgba(255, 255, 255, 0.60)",
    fontSize: 24,
    fontFamily: "Red Hat Display",
    marginTop: 80,
  },
  counter: {
    fontSize: 64,
    color: "white",
    fontFamily: "Red Hat Display",
  },
  counter_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 150,
  },
  routine_container: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.20)",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    gap: 7,
    marginTop: 80,
  },
  routine_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Red Hat Display",
  },
  routine_subtext: {
    color: "rgba(255, 255, 255, 0.60)",
    fontSize: 10,
    fontFamily: "Red Hat Display",
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
});