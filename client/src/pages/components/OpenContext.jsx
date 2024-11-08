import { createContext, useState } from "react";

export const OpenContext = createContext({});

export const OpenContextProvider = ({children}) => {
    const [oopen, setOopen] = useState(false);
    const [ind, setInd] = useState(0);
    const [user, setUser] = useState([]);
    const [dash, setDash] = useState(false);
    const [courses, setCourses] = useState([]);
    const [courseIndex, setCourseIndex] = useState(null);
    return (
        <OpenContext.Provider value={{oopen, setOopen, ind, setInd, user, setUser, dash, setDash, courses, setCourses, courseIndex, setCourseIndex}}>
            {children}
        </OpenContext.Provider>
    );
}