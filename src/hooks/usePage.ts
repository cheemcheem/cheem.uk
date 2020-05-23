import useSavedState from "./useSavedState";
import {defaultPage} from "../common/contexts";
import React, {useEffect} from "react";

export default function usePage(): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [page, savedPage] = useSavedState(defaultPage, "page");
    useEffect(() => {
        document.title = `Kathan Cheema - ${page}`;
    }, [page]);
    return [page, savedPage];
}