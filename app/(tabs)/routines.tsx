import RoutineCard from "@/components/RoutineCard";
import { useRoutines } from "@/hooks/useRoutines";
import { getSavedRoutines } from "@/utilities/routinesStorage";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

export default function Routines() {

  const { routines, setRoutines } = useRoutines();

  useEffect(() => {
    const fetchRoutines = async () => {
      const savedRoutines = await getSavedRoutines();
      
      setRoutines(savedRoutines);
    };
    
    fetchRoutines();
  }, []);
  
  return (
    <LinearGradient
      colors={["#313B6B", "#030B43"]}
      style={styles.container}
    >
      <Text style={styles.title}>Your routines!</Text>
       <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.routines}>
          {routines.map((routine, index) => (
            <RoutineCard 
              key={index} 
              title={routine.title} 
              duration={routine.duration} 
              id={routine.id} 
            />
          ))}
        </View>
      </ScrollView>
      <Link href={'/add-routine'} style={styles.button}>
        <Text style={styles.text} >Add routine</Text>
      </Link>
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
    marginBottom: 35,
  },
  routines: {
    gap: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Red Hat Display",
    textTransform: "capitalize",
    textAlign: "center",
  },
  button: {
    display: "flex",
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.40)",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
});