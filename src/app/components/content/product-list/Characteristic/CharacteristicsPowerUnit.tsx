import {useEffect, useState} from "react";
import {Empty} from 'antd';

type obj = {
    characteristicsPowerUnit: {
        data: {
            id: number,
            attributes: {
                Name: string,
                Form_factor: string,
                Power: number
            }
        }
    }
}

interface SubcategoryProps {
    id: number
}

export default function characteristicsPowerUnit({id}: SubcategoryProps){
    const [response, setResponse] = useState<obj>({
        characteristicsPowerUnit: {
            data: {
                id: 0,
                attributes: {
                    Name: '',
                    Form_factor: '',
                    Power: 0
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
                      characteristicsPowerUnit(id: ${id}){
                        data{
                          attributes{
                            Name
                            Form_factor
                            Power
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


    const resData = response?.characteristicsPowerUnit.data

    return <div>
        {resData !== null ?
            <span>
                <p>Модель: {resData.attributes.Name}</p>
                <p>Форм-фактор: {resData.attributes.Form_factor}</p>
                <p>Мощность: {resData.attributes.Power}w</p>
            </span>
            : <Empty/>}
    </div>
}