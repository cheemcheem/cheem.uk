import {useEffect, useState} from "react";
import {defaultIsNavBarLarge} from "../common/contexts";

export default function useIsNavBarLarge(scrollDiff: number) {
    const [isNavBarLarge, setIsNavBarLarge] = useState(defaultIsNavBarLarge);

    useEffect(() => setIsNavBarLarge(scrollDiff <= 0), [scrollDiff]);

    return isNavBarLarge;
}