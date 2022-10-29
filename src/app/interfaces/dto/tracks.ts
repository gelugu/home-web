export interface CreateTrackDto {
  name: string;
  description?: string;
}

export interface UpdateTrackDto {
  name?: string;
  description?: string;
}
