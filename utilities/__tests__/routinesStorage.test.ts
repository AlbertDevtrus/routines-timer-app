import { Routine } from "@/types";
import { getSavedRoutines, saveRoutines } from "../routinesStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Routines storage login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("save a routine in asyncstorage", async () => {
    const routine: Routine[] = [
      {
        description: "Test",
        duration: 120,
        excersies: [{ order: 0, type: "warm-up", duration: 120 }],
        id: "0",
        title: "test",
      },
    ];

    await saveRoutines(routine);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "routines",
      JSON.stringify(routine)
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("get the saved routines with one routine", async () => {
    const routine: Routine[] = [
      {
        description: "Test",
        duration: 120,
        excersies: [{ order: 0, type: "warm-up", duration: 120 }],
        id: "0",
        title: "test",
      },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(routine));

    const savedRoutines = await getSavedRoutines();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("routines");
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(savedRoutines).toEqual(routine);
  });

  it("get the saved routines with no routines", async () => {
    const defaultRoutine: Routine = {
      id: "0",
      title: "Default routine",
      description: "Warm-up routine",
      duration: 75,
      excersies: [
        { order: 0, type: "warm-up", duration: 15 },
        { order: 1, type: "workout", duration: 60 },
      ],
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const savedRoutines = await getSavedRoutines();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "routines",
      JSON.stringify([defaultRoutine])
    );
    expect(savedRoutines).toEqual([defaultRoutine]);
  });
});
