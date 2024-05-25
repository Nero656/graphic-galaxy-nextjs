import {useEffect, useState} from "react";
import {Button, Empty} from 'antd';
import {store} from "@/redux/store";
import {addNewGPU} from "@/redux/features/BuilderSlices/builderGPU-slice";

type obj = {
    characteristicsGpu: {
        data: {
            id: number,
            attributes: {
                Gpu_name: string
                rtx: boolean
                Number_of_productive_cores: number
                frequency: number
                Techprocess: number
                Memory_type: number
                Memory_buses: number
                Video_memory_capacity: number
            }
        }
    }
}

interface SubcategoryProps {
    id: number
    imgUrl: string
    price: number
}

export default function CharacteristicsGpu({id, imgUrl, price}: SubcategoryProps) {

    const [response, setResponse] = useState<obj>({
        characteristicsGpu: {
            data: {
                id: 0,
                attributes: {
                    Gpu_name: '',
                    rtx: false,
                    frequency: 0,
                    Number_of_productive_cores: 0,
                    Techprocess: 0,
                    Memory_type: 0,
                    Memory_buses: 0,
                    Video_memory_capacity: 0
                }
            }
        }
    })

    useEffect(() => {
        try {
            fetch(`http://localhost:1337/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query{
                      characteristicsGpu(id: ${id}){
                        data{
                          id
                          attributes{
                            Gpu_name
                            rtx
                            Techprocess
                            Memory_type
                            Memory_buses
                            Video_memory_capacity
                            frequency
                          }
                        }
                      }
                    }`,
                    variables: {}
                })
            })
                .then(response => response.json())
                .then(data => setResponse(data.data))
                .then(result => console.log(result))
        } catch (e) {
            console.log(e)
        }
    }, [])


    const resData = response?.characteristicsGpu.data

    return <div>
        {resData !== null ?
            <span>
                <Button type={'primary'} onClick={
                    (e) => {
                        store.dispatch(addNewGPU({
                            name: resData.attributes.Gpu_name,
                            img: imgUrl,
                            price: price
                        }))
                    }
                }>Добавить в сборку</Button>
                <p>Модель: {resData.attributes.Gpu_name}</p>
                <p>RTX ядра: {resData.attributes.rtx ? 'ЕСТЬ' : 'НЕТ'}</p>
                <p>Шина памяти: {resData.attributes.Memory_buses}бит</p>
                <p>Тип памяти: GDDR{resData.attributes.Memory_type}</p>
                <p>Техпроцесс: {resData.attributes.Techprocess}нм</p>
                <p>Частота процессора: {resData.attributes.frequency}</p>
            </span>
            : <Empty/>}
    </div>
}