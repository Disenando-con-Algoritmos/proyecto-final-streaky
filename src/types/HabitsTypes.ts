export type User = {
  id: number;
  username: string;
  habits: Habit[];
}

export type Habit = {
  id: number;
  title: string;
  category: string; 
  color: string;    
  icon: string;     
  progress: Progress;
}

export type Progress = {
  monday: number[];
  tuesday: number[];
  wednesday: number[];
  thursday: number[];
  friday: number[];
  saturday: number[];
  sunday: number[];
}

