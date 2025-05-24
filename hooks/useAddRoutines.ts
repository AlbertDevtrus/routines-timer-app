import { Excersies } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import uuid from 'react-native-uuid';

interface onCreateRoutinesProps {
  title: string;
  description: string;
  excersies: Excersies[];
}

export const useAddRoutine = () => {
  const router = useRouter();

  const onCreateRoutine = async (props: onCreateRoutinesProps) => {
        const { title, description, excersies } = props;

        
        const duration = excersies.reduce((acc, excersie) => acc + excersie.duration, 0);

        const savedRoutines = await AsyncStorage.getItem("routines");

        if (savedRoutines) {
            const routines = JSON.parse(savedRoutines);

            routines.push({
                id: uuid.v4(),
                title,
                description,
                excersies,
                duration
            });

            await AsyncStorage.setItem("routines", JSON.stringify(routines));
        }

        router.push("/routines");
    };

  return {
    onCreateRoutine,
  };
};
