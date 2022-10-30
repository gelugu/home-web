export interface Track {
  id: string;
  name: string;
  description: string;
  owner: string;
  closed_tasks: number;
}

export const emptyTrack: Track = {
  id: "",
  name: "",
  description: "",
  owner: "",
  closed_tasks: 0,
};
