import {createContext, useState, useContext} from 'react'

export const SearchContext = createContext(null);
const SearchContextProvider = ({children}) => {
    const [searchString, setSearchString] = useState("");

    return (
        <SearchContext.Provider value={{searchString, setSearchString}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearchContext() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchContextProvider")
    }
    return context;
}


export default SearchContextProvider