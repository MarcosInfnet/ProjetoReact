import { useState, useEffect } from "react";
import {api} from "../api";
import {Toggle1} from "../components/Toggle1";
import {Kudos} from "../components/Kudos";
import { AiOutlineLoading3Quarters as LoadBar} from 'react-icons/Ai'
import { Card } from "../components/Card";

const initialNotepads = [];
const initialLoading = true;

export function HomeRoute(){

const [ notepads , setNotepads ] = useState(initialNotepads);
const [ loading, setLoading] = useState(initialLoading);

async function loadNotepads(){

    const response = await api.get("/notepads");
    const nextNotepads = response.data.notepads;
    setNotepads(nextNotepads);
}

    useEffect(() => {
        loadNotepads();
    },[ ]);

    useEffect(() => {
        if(notepads.length >0) {
            setLoading(false);
        }
    },[notepads]);

    const [checked,setChecked] = useState(false);

    return <header className="flex flex-col justify-between max-w-screen-md md:mx-auto" >
    
    {loading &&
    <div className="flex absolute py-7 top-18 left-5">
        <LoadBar className="text-4xl animate-spin"/>
    </div>}
    
    <div className="flex absolute py-7 top-18 right-5">
    <Toggle1 checked={checked} onClick={()=> setChecked(true)}/>
    </div>
    
    <Card className ={`p-1 bg-amber-100 my-1 md:max-w-screen-md md:mx-auto rounded-lg shadow flex relative   ${checked ? 'flex-row text-green-400 w-full flex-wrap gap-x-96':'py-10  grid grid-cols-3 gap-2 place-content-start w-full'}`}>
        
        {notepads.map(notepad => {
        
        return (

        <div className={`flex relative flex-row flex-wrap mx-2 ${checked ? 'flex-row mx-4 ':'flex-col'}`}>
            
            <div key={notepad.id} className="p-2 bg-amber-100 my-2 md:max-w-screen-md md:mx-auto rounded-lg shadow h-auto">
                
                <span className="text-gray-500 mb-1 flex flex-wrap">#{notepad.id}</span>
                <span className="text-md text-gray-500 leading-tight mb-2">{new Date(notepad.created_at).toLocaleDateString()}</span>  
                <h2 className='text-lg font-bold leading-tight mb-1'>{notepad.title}</h2>
                <p className='text-md leading-tight mb-1'>{notepad.subtitle}</p>
                <p className='text-md leading-tight mb-5 overflow-hidden truncate w-48'>{notepad.content}</p>
                <div className="flex justify-end">
                <Kudos className="flex content-end" to={`${notepad.id}`}/>
                </div>   
            </div>
        </div>
       )})}

    </Card>
    </header>
    }


    
