import { Excersies, Routine } from "@/types";
import formatTime from "@/utilities/formatTime";
import { clearRoutines, getSavedRoutines, saveRoutines } from "@/utilities/routinesStorage";
import { useRouter } from "expo-router";

interface onSavedRoutinesProps {
  title: string;
  description: string;
  excersies: Excersies[];
  routineId: string;
}

export const useEditRoutines = () => {
  const router = useRouter();
  const onDeleteRoutine = async (routineId: string) => {
    const savedRoutines = await getSavedRoutines();

    if (savedRoutines) {
      const routines = savedRoutines;
      const updatedRoutines = routines.filter(
        (routine: Routine) => routine.id !== routineId
      );

      if(updatedRoutines.length < 1) {
        await clearRoutines();
      } else {
        await saveRoutines(updatedRoutines);
      }

    }

    router.push("/routines");
  };

  const onSaveRoutine = async (props: onSavedRoutinesProps) => {
    const { title, description, excersies, routineId } = props;

    const duration = excersies.reduce((acc, excersie) => acc + excersie.duration, 0)

    const savedRoutines = await getSavedRoutines();
    if (savedRoutines) {
      const routines = savedRoutines;
      const updatedRoutines: Routine[] = routines.map((routine: Routine) => {
        if (routine.id === routineId) {
          const updatedRoutine: Routine = {
            ...routine,
            title,
            description,
            excersies,
            duration,
          };

          return updatedRoutine;
        }

        return routine;
      });

      await saveRoutines(updatedRoutines);
    }

    router.push("/routines");
  };

  return {
    onDeleteRoutine,
    onSaveRoutine,
  };
};
