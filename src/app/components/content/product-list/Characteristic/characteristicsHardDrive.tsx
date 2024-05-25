import {useEffect, useState} from "react"
import {Button, Empty} from 'antd'
import {store} from "@/redux/store"
import {addNewHDD} from "@/redux/features/BuilderSlices/builderHDD-slice"

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
    imgUrl: string
    price: number
}

export default function characteristicsHardDrive({id, imgUrl, price}: SubcategoryProps){
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
            fetch(`${store.getState().api.value.url}`, {
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
             <Button type={'primary'} onClick={
                 (e) => {
                     store.dispatch(addNewHDD({
                         name: resData.attributes.Hard_drive_name,
                         img: imgUrl,
                         price: price
                     }))
                 }
             }>Добавить в сборку</Button>
            <p>Модель: {resData.attributes.Hard_drive_name}</p>
            <p>Объем кеша: {resData.attributes.size_of_cache}</p>
            <p>Объем {resData.attributes.size}гб</p>
            <p>Скорость вращения шпинделя : {resData.attributes.Spindle_speed}</p>
            </span>
            : <Empty/>}
    </div>
}