import {useEffect, useState} from "react";
import {Button, Empty} from 'antd';
import {store} from "@/redux/store";
import {addNewMatherBoard} from "@/redux/features/BuilderSlices/builderMotherboard-slice";

type obj = {
    characteristicsMotherboard: {
        data: {
            id: number,
            attributes: {
                Matherboard_name: string,
                Form_factor: string,
                Socket: string,
                Chipset: string,
                Memory_type: string,
                Number_of_memory_channels: number,
                NVMe: boolean,
                Number_of_M2_connectors: number,
                Number_of_memory_slots: number
            }
        }
    }
}

interface SubcategoryProps {
    id: number
    imgUrl: string
    price: number
}

export default function CharacteristicsMotherboard({id, imgUrl, price}: SubcategoryProps) {

    const [response, setResponse] = useState<obj>({
        characteristicsMotherboard: {
            data: {
                id: 0,
                attributes: {
                    Matherboard_name: '',
                    Form_factor: '',
                    Socket: '',
                    Chipset: '',
                    Memory_type: '',
                    Number_of_memory_channels: 0,
                    NVMe: false,
                    Number_of_M2_connectors: 0,
                    Number_of_memory_slots: 0
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
                      characteristicsMotherboard(id: ${id}){
                        data{
                          attributes{
                            Matherboard_name
                            Form_factor
                            Socket
                            Chipset
                            Memory_type
                            Number_of_memory_channels
                            NVMe
                            Number_of_M2_connectors
                            Number_of_memory_slots
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


    const resData = response?.characteristicsMotherboard.data

    return <div>
        {resData !== null ?
            <span>
                <Button type={'primary'} onClick={
                    (e) => {
                        store.dispatch(addNewMatherBoard({
                            name: resData.attributes.Matherboard_name,
                            socket: resData?.attributes.Socket,
                            chipset: resData?.attributes.Chipset,
                            ram: resData?.attributes.Memory_type,
                            img: imgUrl,
                            price: price
                        }))
                    }
                }>Добавить в сборку</Button>
            <p>Модель: {resData.attributes.Matherboard_name}</p>
            <p>Тип памяти: {resData.attributes.Memory_type}</p>
            <p>Сокет: {resData.attributes.Socket}</p>
            <p>Чипсет: {resData.attributes.Chipset}</p>
            <p>Количество каналов памяти: {resData.attributes.Number_of_memory_channels}</p>
            <p>Количество слотов памяти: {resData.attributes.Number_of_memory_slots}</p>
            <p>NVMe: {resData.attributes.NVMe ? 'есть' : 'нет'}</p>
            <p>Количество NVMe конвекторов : {resData.attributes.Number_of_M2_connectors}</p>
            </span>
            : <Empty/>}
    </div>
}