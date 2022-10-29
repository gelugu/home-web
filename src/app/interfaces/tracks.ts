export interface Track {
  id: string
  name: string
  description: string
  owner: string
}

export const emptyTrack: Track = {
  id: "",
  name: "",
  description: "",
  owner: "",
};
