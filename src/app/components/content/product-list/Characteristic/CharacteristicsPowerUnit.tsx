import {useEffect, useState} from "react";
import {Button, Empty} from 'antd';
import {store} from "@/redux/store";
import {addPowerUnit} from "@/redux/features/BuilderSlices/builderPowerUnit-slice";

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
    imgUrl: string
    price: number
}

export default function characteristicsPowerUnit({id, imgUrl, price}: SubcategoryProps){
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
                <Button type={'primary'} onClick={
                    (e) => {
                        store.dispatch(addPowerUnit({
                            name: resData.attributes.Name,
                            img: imgUrl,
                            price: price
                        }))
                    }
                }>Добавить в сборку</Button>
                <p>Модель: {resData.attributes.Name}</p>
                <p>Форм-фактор: {resData.attributes.Form_factor}</p>
                <p>Мощность: {resData.attributes.Power}w</p>
            </span>
            : <Empty/>}
    </div>
}