import { Routine } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const defaultRoutine: Routine = {
  id: uuid.v4(),
  title: "Default routine",
  description: "Warm-up routine",
  duration: 75,
  excersies: [
    { order: 0, type: "warm-up", duration: 15 },
    { order: 1, type: "workout", duration: 60 },
  ],
};

export const getSavedRoutines = async (): Promise<Routine[]> => {
  const savedRoutines = await AsyncStorage.getItem("routines");

  if (!savedRoutines) {
    await AsyncStorage.setItem("routines", JSON.stringify([defaultRoutine]));
    return [defaultRoutine];
  }

  return JSON.parse(savedRoutines);
};

export const saveRoutines = async (routines: Routine[]): Promise<void> => {
  await AsyncStorage.setItem("routines", JSON.stringify(routines));
};

export const clearRoutines = async (): Promise<void> => {
  await AsyncStorage.clear();
};
