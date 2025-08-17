import { Excersies, Routine } from "@/types";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, Dimensions } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, scrollTo, runOnJS, withDecay, withTiming, interpolateColor } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import SelectRoutineModal from "@/components/SelectRoutineModal";
import RoutineCard from "@/components/RoutineCard";
import { getSavedRoutines } from "@/utilities/routinesStorage";
import { useRoutines } from "@/hooks/useRoutines";
import ExerciesCounter from "@/components/ExerciesCounter";
import { useTabStore } from "@/stores/tabStore";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const ITEM_WIDTH = SCREEN_WIDTH * 0.45;
const SIDE_SPACING = (SCREEN_WIDTH - ITEM_WIDTH) / 2.75;

export default function Timer() {

  const [fontsLoaded] = useFonts({
    "Red Hat Display": require("@/assets/fonts/RedHatDisplay-Regular.ttf"),
  });
  const [activeExcersie, setActiveExcersie] = useState<Excersies>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [counter, setCounter] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { setTabStyle } = useTabStore();

  const { routines, setRoutines } = useRoutines();

  const scale = useSharedValue(1);
  const animateStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const scrollX = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const offsetX = event.contentOffset.x;
      const index = Math.round(offsetX / ITEM_WIDTH);

      runOnJS(setActiveIndex)(index);
    },
  });

  const handlePressIn = () => {
    setIsModalVisible(true);
    scale.value = withSpring(0.97, { damping: 10 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  }

  useEffect(() => {
    const fetchRoutines = async () => {
      const savedRoutines = await getSavedRoutines();

      setRoutines(savedRoutines);

      const firstRoutine = savedRoutines[0];
      setSelectedRoutine(firstRoutine)
      setActiveExcersie(firstRoutine.excersies[0]);
      setCounter(firstRoutine.excersies[0].duration)
    };

    fetchRoutines();

  }, []);

  useEffect(() => {
    if (selectedRoutine && activeExcersie) {
      const index = selectedRoutine.excersies.findIndex(
        (e) => e.order === activeExcersie.order
      );
      scrollTo(scrollRef, index * ITEM_WIDTH, 0, true);
    }
  }, [activeExcersie]);

  useEffect(() => {
    if (selectedRoutine) {
      const newExercise = selectedRoutine.excersies[activeIndex];
      if (newExercise) {
        setActiveExcersie(newExercise);
        setCounter(newExercise.duration);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeExcersie) {
      let tabColor = "#442800";
      let headerColor = "#6B5E31";

      if (activeExcersie.type === "warm-up") {
        tabColor = "#442800";
        headerColor = "#6B5E31";
      } else if (activeExcersie.type === "rest") {
        tabColor = "#015911";
        headerColor = "#4FA04A";
      } else if (activeExcersie.type === "workout") {
        tabColor = "#440001";
        headerColor = "#923B3B";
      }

      setTabStyle("index", { tabColor, headerColor });

    }
  }, [activeExcersie]);

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={activeExcersie?.type === "warm-up" ? ["#6B5E31", "#442800"] : activeExcersie?.type === "rest" ? ["#4FA04A", "#015911"] : activeExcersie?.type === "workout" ? ["#923B3B", "#440001"] : ["#6B5E31", "#442800"]}
        style={styles.container}
      >
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={10}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          snapToAlignment="start"
          contentContainerStyle={{
            paddingHorizontal: SIDE_SPACING,
          }}
        >
          {selectedRoutine?.excersies.map((ex, index) => (
            <ExerciesCounter
              key={ex.order}
              excersie={ex}
              isActive={activeExcersie?.order === ex.order}
              counter={counter}
            />
          ))}
        </Animated.ScrollView>
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
        <View>
          <SelectRoutineModal isVisible={isModalVisible} onClose={onCloseModal} routines={routines} selectRoutine={setSelectedRoutine} activeExcersie={setActiveExcersie} />
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
    paddingHorizontal: 30,
  },
  title: {
    color: "rgba(255, 255, 255, 0.60)",
    fontSize: 24,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Red Hat Display",
    marginTop: 80,
    textTransform: "capitalize"
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
    marginTop: 50,
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
  excersiesContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },

  exerciseItem: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});