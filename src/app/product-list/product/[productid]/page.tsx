"use client"
import {usePathname} from 'next/navigation'
import {useState, useEffect} from 'react'
import {Image, Empty, Tabs, Button} from "antd"
import CharacteristicsCpu from "@/app/components/content/product-list/Characteristic/CharacteristicsCpu"
import CharacteristicsGpu from "@/app/components/content/product-list/Characteristic/CharacteristicsGpu"
import CharacteristicsRam from "@/app/components/content/product-list/Characteristic/CharacteristicsRam"
import CharacteristicMotherboard from "@/app/components/content/product-list/Characteristic/CharacteristicsMotherboard"
import CharacteristicCoolingCpu from "@/app/components/content/product-list/Characteristic/characteristicsCoolingCpu"
import CharacteristicsSsd from "@/app/components/content/product-list/Characteristic/characteristicsSsd"
import CharacteristicsPowerUnit from "@/app/components/content/product-list/Characteristic/CharacteristicsPowerUnit"
import СharacteristicsHardDrive from "@/app/components/content/product-list/Characteristic/characteristicsHardDrive"
import СharacteristicsComputerCase from "@/app/components/content/product-list/Characteristic/characteristicsComputerCase"

type obj = {
    product: {
        data: {
            id: number
            attributes: {
                Name: string,
                Description: string,
                Price: number
                category_type_id: number
                characteristic_id: number
                Image: {
                    data: {
                        id: number,
                        attributes: {
                            url: string
                        },

                    }
                }
            }
        }
    }
}

export default function page({params}: { params: { id: number } }) {

    const path = usePathname();

    const [response, setResponse] = useState<obj>(
        {
            product: {
                data: {
                    id: 0,
                    attributes: {
                        Name: '',
                        Description: '',
                        Price: 0,
                        category_type_id: 0,
                        characteristic_id: 0,
                        Image: {
                            data: {
                                id: 0,
                                attributes: {
                                    url: ''
                                }
                            }
                        },
                    }

                }
            }
        }
    )

    useEffect(() => {
        try {
            fetch(`http://192.168.1.90:1337/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query{
                              product(id: ${path.split('/').slice(-1)}){
                                data {
                                  id
                                  attributes{
                                    Name
                                    Description
                                    Price
                                    category_type_id
                                    characteristic_id
                                    Image{
                                        data{
                                        id
                                        attributes{
                                          url
                                        }
                                      }
                                    }
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

    const resData = response?.product.data

    const tabs = [
        {
            label: 'Описание',
            key: '1',
            children: <span className={'product_text'}>
                <h1>
                    <strong style={{fontSize: '1.5em'}}>Описание</strong>
                </h1>
                <p>{resData.attributes.Description}</p>
            </span>,
        },
        {
            label: 'Характеристики',
            key: '2',
            children: <div className={'product_text'}> {resData.attributes.category_type_id === 0 &&
                <CharacteristicsCpu id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 1 &&
                <CharacteristicsGpu id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 2 &&
                <CharacteristicsRam id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 3 &&
                <CharacteristicMotherboard id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 4 &&
                <CharacteristicCoolingCpu id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 5 &&
                <CharacteristicsSsd id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 6 &&
                <CharacteristicsPowerUnit id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 7 &&
                <СharacteristicsHardDrive id={resData.attributes.characteristic_id}/>
            }
            {resData.attributes.category_type_id === 8 &&
                <СharacteristicsComputerCase id={resData.attributes.characteristic_id}/>
            }
            </div>,
            disabled: false,
        },
    ]

    return <>
        {response !== null ? <div className={'product_container'}>
                <span className={'product_main'}>
                    {resData.attributes.Image.data !== null ?
                        <Image
                            width={200}
                            height={200}
                            className={'img'}
                            src={`http://192.168.1.90:1337` + resData.attributes.Image.data.attributes.url}/> :
                        <Image
                            width={200}
                            height={200}
                            src="error"
                            fallback="data:image/png;base64,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"
                        />
                    }

                    <span className={'product_naming'}>
                        <h1 className={'name'}>{resData.attributes.Name}</h1>
                        <div className={'buy_field'}>
                            <h3 style={{color: 'red'}}> цена: {resData.attributes.Price}</h3>
                            <Button type={'primary'} style={{marginLeft: 10}}>купить</Button>
                        </div>
                    </span>
                </span>
            <Tabs
                className={'product_text'}
                defaultActiveKey="1"
                items={tabs}
            />

        </div> : <Empty/>}
    </>
}
