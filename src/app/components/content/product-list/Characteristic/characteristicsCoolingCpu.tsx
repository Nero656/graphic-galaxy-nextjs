import {useEffect, useState} from "react";
import {Button, Empty} from 'antd';
import {store} from "@/redux/store";
import {addNewMatherBoard} from "@/redux/features/BuilderSlices/builderMotherboard-slice";
import {addNewCooling} from "@/redux/features/BuilderSlices/builderCooling-slice";

type obj = {
    characteristicsCoolingCpu: {
        data: {
            id: number,
            attributes: {
                cooling_name: string
                tdp: string
                Soket: string
            }
        }
    }
}

interface SubcategoryProps {
    id: number
    imgUrl: string
    price: number
}
export default function characteristicsCoolingCpu({id, imgUrl, price}: SubcategoryProps) {

    const [response, setResponse] = useState<obj>({
        characteristicsCoolingCpu: {
            data: {
                id: 0,
                attributes: {
                    cooling_name: '',
                    tdp: '',
                    Soket: ''
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
                      characteristicsCoolingCpu(id: ${id}){
                        data{
                          attributes{
                            cooling_name
                            tdp
                            Soket
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


    const resData = response?.characteristicsCoolingCpu.data

    return <div>
        {resData !== null ?
            <span>
                <Button type={'primary'} onClick={
                    (e) => {
                        store.dispatch(addNewCooling({
                            name: resData.attributes.cooling_name,
                            tdp: resData?.attributes.tdp,
                            img: imgUrl,
                            price: price
                        }))
                    }
                }>Добавить в сборку</Button>
                <p>Модель: {resData.attributes.cooling_name}</p>
                <p>tdp: {resData.attributes.tdp}</p>
                <p>Сокет: {resData.attributes.Soket}</p>
            </span>
            : <Empty/>}
    </div>
}