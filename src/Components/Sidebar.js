import React, { useState } from "react";


export default function Sidebar({ aesc, desc, onFilter }) {

    const [filter, setFilter] = useState(["", ""]);

    const onTypeFilter = (type) => () => {
        let tempFilter = [...filter];
        tempFilter[0] = type;
        setFilter(tempFilter);
        onFilter(tempFilter);
    };

    const onSizeFilter = (size) => () => {
        let tempFilter = [...filter];
        tempFilter[1] = size;
        console.log(tempFilter);
        setFilter(tempFilter);
        onFilter(tempFilter);
    };
    return ( <
        div className = "product-wrapper sidebar" >
        <
        div className = "row" >
        <
        div className = "col" >
        <
        h4 > Sort < /h4> <
        hr / >
        Price < br / >
        <
        button onClick = { aesc }
        className = "standalone" > { " " }
        Ascending { " " } <
        /button>{" "} <
        br / >
        <
        button onClick = { desc }
        className = "standalone" > { " " }
        Descending { " " } <
        /button>{" "} <
        br / >
        <
        /div> <
        div className = "col" >
        <
        h4 > Filter By < /h4> <
        hr / >
        Type < br / >
        <
        label onClick = { onTypeFilter("") }
        htmlFor = "Allt" >
        <
        input type = "radio"
        id = "Allt"
        name = "type"
        defaultChecked = "true" /
        >
        All <
        /label> <
        br / >
        <
        label onClick = { onTypeFilter("BMX") }
        htmlFor = "BMX" >
        <
        input type = "radio"
        id = "BMX"
        name = "type" /
        >
        BMX <
        /label> <
        br / >
        <
        label onClick = { onTypeFilter("MTB") }
        htmlFor = "MTB" >
        <
        input type = "radio"
        id = "MTB"
        name = "type" /
        >
        MTB <
        /label> <
        br / >
        <
        label onClick = { onTypeFilter("Hybrid") }
        htmlFor = "Hybrid" >
        <
        input type = "radio"
        id = "Hybrid"
        name = "type" /
        >
        Hybrid <
        /label> <
        br / >
        <
        hr / >
        Size < br / >
        <
        label onClick = { onSizeFilter("") }
        htmlFor = "All" >
        <
        input defaultChecked = "true"
        type = "radio"
        id = "All"
        name = "size" /
        >
        All <
        /label> <
        br / >
        <
        label onClick = { onSizeFilter("Small") }
        htmlFor = "Small" >
        <
        input type = "radio"
        id = "Small"
        name = "size" /
        >
        Small <
        /label> <
        br / >
        <
        label onClick = { onSizeFilter("Medium") }
        htmlFor = "Medium" >
        <
        input type = "radio"
        id = "Medium"
        name = "size" /
        >
        Medium <
        /label> <
        br / >
        <
        label onClick = { onSizeFilter("Large") }
        htmlFor = "Large" >
        <
        input type = "radio"
        id = "Large"
        name = "size" /
        >
        Large <
        /label> <
        /div> <
        /div> <
        /div>
    );
}