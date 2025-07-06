import { ScrollView } from "react-native";

import { ExcersiesItem } from "./ExcersiesItem";

import { Excersies } from "@/types"
import { EXCERSIES_HEIGHT } from "@/utilities/constants";

interface Props {
    excersies: Excersies[];
    onRemoveExcersies: (order: number) => void;
}

export function ExcersiesList({ excersies, onRemoveExcersies }: Props) {

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
                        />
                    ))
                }
            </ScrollView>
        </>
    )
};

