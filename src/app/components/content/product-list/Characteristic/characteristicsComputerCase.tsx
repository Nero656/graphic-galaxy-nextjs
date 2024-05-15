import {useEffect, useState} from "react";
import {Empty} from 'antd';

type obj = {
    characteristicsComputerCase: {
        data: {
            id: number,
            attributes: {
                Case_name: string,
                Form_factor: string,
            }
        }
    }
}

interface SubcategoryProps {
    id: number
}

export default function characteristicsHardDrive({id}: SubcategoryProps){
    const [response, setResponse] = useState<obj>({
        characteristicsComputerCase: {
            data: {
                id: 0,
                attributes: {
                    Case_name: '',
                    Form_factor: ''
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
                      characteristicsComputerCase(id: ${id}){
                        data{
                          attributes{
                            Case_name
                            Form_factor
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


    const resData = response?.characteristicsComputerCase.data

    return <div>
        {resData !== null ?
            <span>
            <p>Модель: {resData.attributes.Case_name}</p>
            <p>Форм-фактор {resData.attributes.Form_factor}</p>
            </span>
            : <Empty/>}
    </div>
}