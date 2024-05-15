import {useEffect, useState} from "react";
import {Empty} from 'antd';

type obj = {
    characteristicsSsd: {
        data: {
            id: number,
            attributes: {
                name: string,
                m2: string,
                Memory_size: number
            }
        }
    }
}

interface SubcategoryProps {
    id: number
}

export default function characteristicsSsd({id}: SubcategoryProps){
    const [response, setResponse] = useState<obj>({
        characteristicsSsd: {
            data: {
                id: 0,
                attributes: {
                    name: '',
                    m2: '',
                    Memory_size: 0
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
                      characteristicsSsd(id: ${id}){
                        data{
                          attributes{
                            name
                            m2
                            Memory_size
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


    const resData = response?.characteristicsSsd.data

    return <div>
        {resData !== null ?
            <span>
            <p>Модель: {resData.attributes.name}</p>
            <p>Объем: {resData.attributes.Memory_size} гб</p>
            <p>M2: {resData.attributes.m2 ? 'Есть': 'Нету'}</p>
            </span>
            : <Empty/>}
    </div>
}