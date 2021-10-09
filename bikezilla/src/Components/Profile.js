import React from 'react'
import { useData } from '../Utils/DataContext'

export default function Profile() {
    const {data} = useData();
    console.log(data); 
    return (
        <div>
            Profile
        </div>
    )
}
