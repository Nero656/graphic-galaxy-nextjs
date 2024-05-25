import {useEffect, useState} from "react";
import {Button, Empty} from 'antd';
import {store} from "@/redux/store";
import {addNewRAM} from "@/redux/features/BuilderSlices/builderRAM-slice";

type obj = {
    characteristicsRam: {
        data: {
            id: number,
            attributes: {
                ram_name: string
                ram_type  : string
                Memory_form_factor : string
                Frequency: number
                Memory_size: number
                Profiles_XMP: string
            }
        }
    }
}

interface SubcategoryProps {
    id: number
    imgUrl: string
    price: number
}

export default function CharacteristicsRam({id, imgUrl, price}: SubcategoryProps) {

    const [response, setResponse] = useState<obj>({
        characteristicsRam: {
            data: {
                id: 0,
                attributes: {
                    ram_name: '',
                    ram_type  : '',
                    Memory_form_factor : '',
                    Frequency: 0,
                    Memory_size: 0,
                    Profiles_XMP: ''
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
                      characteristicsRam(id: ${id}){
                        data{
                          attributes{
                            ram_name
                            ram_type
                            Memory_form_factor
                            Frequency
                            Memory_size
                            Profiles_XMP
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


    const resData = response?.characteristicsRam.data

    return <div>
        {resData !== null?
            <span>
                <Button type={'primary'} onClick={
                    (e) => {
                        store.dispatch(addNewRAM({
                            name: resData?.attributes.ram_name,
                            ram: resData?.attributes.ram_type,
                            img: imgUrl,
                            price: price,
                        }))
                    }
                }>Добавить в сборку</Button>
            <p>Модель: {resData.attributes.ram_name}</p>
            <p>Тип памяти: {resData.attributes.ram_type}</p>
            <p>Объём памяти: {resData.attributes.Memory_size}гб</p>
            <p>Частота: {resData.attributes.Frequency}мгц</p>
            <p>XMP профили: {resData.attributes.Profiles_XMP ? 'есть' : 'нет'}</p>
            </span>
            : <Empty/>}
    </div>
}