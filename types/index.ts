export type Excersies = {
  order: number;
  type: "rest" | "warm-up" | "workout";
  duration: number;
};

export interface Routine {
  id: string;
  title: string;
  description: string;
  duration: number;
  excersies: Excersies[];
}