import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApi } from "../hooks";
import { emptyTrack, Track } from "../interfaces";
import { AuthContext } from "./auth";

export interface ITracksContext {
  currentTrack: Track;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  fetchTasks: () => void;
}

export const TracksContext = createContext<ITracksContext>({
  currentTrack: emptyTrack,
  setCurrentTrack: () => null,
  tracks: [],
  setTracks: () => null,
  fetchTasks: () => null,
});

export const TracksContextProvider = ({
  children,
}: PropsWithChildren<ITracksContext>): JSX.Element => {
  const { token } = useContext(AuthContext);

  const { getTracks } = useApi();

  const [currentTrack, _setCurrentTrack] = useState(emptyTrack);
  const [tracks, setTracks] = useState<Track[]>([]);

  const setCurrentTrack = useCallback((track: Track) => {
    if (track) {
      _setCurrentTrack(track);
      localStorage.setItem("currentTrack", track.id);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    if (token !== "") {
      getTracks().then((data) => {
        setTracks(data);

        const localTrack = localStorage.getItem("currentTrack");
        if (
          data.length > 0 &&
          localTrack &&
          data.map((t) => t.id).includes(localTrack)
        ) {
          setCurrentTrack(data.filter((t) => t.id === localTrack)[0]);
        } else setCurrentTrack(data[0]);
      });
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [token]);

  return (
    <TracksContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        tracks,
        setTracks,
        fetchTasks,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};
