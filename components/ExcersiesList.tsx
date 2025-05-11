import { ScrollView } from "react-native";

import { ExcersiesItem } from "./ExcersiesItem";

import { Excersies } from "@/types"
import { EXCERSIES_HEIGHT } from "@/utilities/constants";

interface Props {
    excersies: Excersies[];
    onRemoveExcersies: (order: number) => void;
}

function listToObject(list: any) {
    const values: any = Object.values(list);
    const object: any = {};

    for (let i = 0; i < values.length; i++) {
        object[values[i].order] = i;
    }

    return object;
}

export function ExcersiesList({ excersies, onRemoveExcersies }: Props) {
    const positions = listToObject(excersies);

    return (
        <>
            <ScrollView
                style={{ paddingHorizontal: 20 }}
                contentContainerStyle={{
                    height: excersies.length * (EXCERSIES_HEIGHT + 3),
                }}
            >
                {
                    excersies.map((excersie) => (
                        <ExcersiesItem
                            key={excersie.order}
                            excersie={excersie}
                            order={excersie.order}
                            onRemoveExcersies={onRemoveExcersies}
                            positions={positions}
                        />
                    ))
                }
            </ScrollView>
        </>
    )
};

