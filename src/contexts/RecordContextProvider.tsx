import { createContext, ReactNode, useEffect, useState } from "react";
import { getSavedRecordings } from "../lib/fileSystem";

export type Recordings = { name: string; uri: string }[];

export type RecordContextType = {
  recordings: Recordings;
  setRecordings: (value: Recordings) => void;
};

export const RecordContext = createContext<RecordContextType | null>(null);

type Props = { children: ReactNode };

const RecordContextProvider = ({ children }: Props) => {
  const [recordings, setRecordings] = useState<Recordings>([]);

  useEffect(() => {
    const loadRecordings = async () => {
      const savedValues = await getSavedRecordings();
      if (savedValues) {
        setRecordings(savedValues);
      } else {
        alert("Error loading recordings");
      }
    };
    loadRecordings();
  }, []);

  return (
    <RecordContext.Provider value={{ recordings, setRecordings }}>
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContextProvider;
