import Page from "./Page";
import React from "react";
import {PageMapping, PageType} from "../common/types";

export default function Main() {
    const pageMapping: { page: PageType, component: any }[] = [];
    PageMapping.forEach((value, key) => pageMapping.push({page: key, component: value.component}));
    return <>
        <main>
            {pageMapping.map(mapping => <Page key={mapping.page} targetPage={mapping.page}>{mapping.component}</Page>)}
        </main>
    </>;
}