import { Routine } from "@/types";
import { getSavedRoutines } from "@/utilities/routinesStorage";
import { useRouter } from "expo-router";
import { useState } from "react";


export const useRoutines = () => {
  const router = useRouter();
  const [routines, setRoutines] = useState<Routine[]>([]);

  const getRoutine = async (routineId: string) => {
    const savedRoutines = await getSavedRoutines();
    if (savedRoutines) {
      savedRoutines;
      const selectedRoutine: Routine | undefined = savedRoutines.find(
        (routine: Routine) => routine.id === routineId
      );

      if (!selectedRoutine) {
        router.push("/add-routine");
      }

      return selectedRoutine;
    } else {
      router.push("/routines");
    }
  };

  return {
    routines,
    setRoutines,
    getRoutine,
  };
};
