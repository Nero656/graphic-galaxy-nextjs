import {useEffect, useState} from "react";
import {Empty} from 'antd';

type obj = {
    characteristicsHardDrive: {
        data: {
            id: number,
            attributes: {
                Hard_drive_name: string,
                size: number,
                size_of_cache: number,
                Spindle_speed: number
            }
        }
    }
}

interface SubcategoryProps {
    id: number
}

export default function characteristicsHardDrive({id}: SubcategoryProps){
    const [response, setResponse] = useState<obj>({
        characteristicsHardDrive: {
            data: {
                id: 0,
                attributes: {
                    Hard_drive_name: '',
                    size: 0,
                    size_of_cache: 0,
                    Spindle_speed: 0
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
                      characteristicsHardDrive(id: ${id}){
                        data{
                          attributes{
                            Hard_drive_name
                            size
                            size_of_cache
                            Spindle_speed
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


    const resData = response?.characteristicsHardDrive.data

    return <div>
        {resData !== null ?
            <span>
            <p>Модель: {resData.attributes.Hard_drive_name}</p>
            <p>Объем кеша: {resData.attributes.size_of_cache}</p>
            <p>Объем {resData.attributes.size}гб</p>
            <p>Скорость вращения шпинделя : {resData.attributes.Spindle_speed}</p>
            </span>
            : <Empty/>}
    </div>
}