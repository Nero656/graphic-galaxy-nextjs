import {useEffect, useState} from "react";
import { Empty } from 'antd';

type obj = {
    characteristicsCpu: {
        data: {
            id: number,
            attributes: {
                Core_name: string,
                Core: number,
                Socket: string,
                Number_of_productive_cores: number
                L2_cache_size: number
                L3_cache_size: number
                Techprocess: string
                Base_CPU_frequency: number
                Maximum_frequency_in_turbo_mode: number
                TDP: number
                Memory_type: string
                Maximum_supported_memory_size: number
            }
        }
    }
}

interface SubcategoryProps {
    id: number
}

export default function CharacteristicsCpu({id}: SubcategoryProps) {

    const [response, setResponse] = useState<obj>({
        characteristicsCpu: {
            data: {
                id: 0,
                attributes: {
                    Core_name: '',
                    Core: 0,
                    Socket: '',
                    Number_of_productive_cores: 0,
                    L2_cache_size: 0,
                    L3_cache_size: 0,
                    Techprocess: '',
                    Base_CPU_frequency: 0,
                    Maximum_frequency_in_turbo_mode: 0,
                    TDP: 0,
                    Memory_type: '',
                    Maximum_supported_memory_size: 0
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
                      characteristicsCpu(id: ${id}){
                        data{
                          id
                          attributes{
                            Core_name
                            Core
                            Core_name
                            Socket
                            Number_of_productive_cores
                            L2_cache_size
                            L3_cache_size
                            Techprocess
                            Base_CPU_frequency
                            Maximum_frequency_in_turbo_mode
                            TDP
                            Memory_type
                            Maximum_supported_memory_size
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

    const resData = response?.characteristicsCpu.data

    return <div>
        {resData !== null ?
            <span>
                <p>Модель: {resData.attributes.Core_name}</p>
                <p>Сокет: {resData.attributes.Socket}</p>
                <p>Количество производительных ядер: {resData.attributes.Number_of_productive_cores}</p>
                <p>L2 кэш: {resData.attributes.L2_cache_size}mb</p>
                <p>L3 кэш: {resData.attributes.L3_cache_size}mb</p>
                <p>Тех. процесс {resData.attributes.Techprocess}</p>
                <p>TDP {resData.attributes.TDP}</p>
                <p>Базовая частота {resData.attributes.Base_CPU_frequency}</p>
                <p>Максимальная частота {resData.attributes.Maximum_frequency_in_turbo_mode}</p>
                <p>Тип памяти {resData.attributes.Memory_type}</p>
            </span>
            : <Empty/>}
    </div>
}