"use client"
import {usePathname} from 'next/navigation'
import ProductBody from '@/app/components/content/product-list/index'
import {useState, useEffect} from 'react'
import {store} from "@/redux/store";

type obj = {
    products: {
        data: [{
            id: number,
            attributes: {
                Name: string,
                Description: string,
                Price: number
                Image: {
                    data: {
                        attributes: {
                            url: string
                        }
                    }
                }
            }
        }]
    }
}

export default function page({params}: { params: { id: number } }) {

    const path = usePathname();

    const [response, setResponse] = useState<obj>(
        {
            products: {
                data: [{
                    id: 0,
                    attributes: {
                        Name: '',
                        Description: '',
                        Price: 0,
                        Image: {
                            data: {
                                attributes: {
                                    url: ''
                                }
                            }
                        }
                    }
                }]
            }
        }
    )

    useEffect(() => {
        try {
            fetch(`${store.getState().api.value.url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query {
                              subcategorie(id: ${path.split('/').slice(-1)}) {
                                data {
                                  attributes {
                                    products {
                                      data {
                                        id
                                        attributes {
                                          Name
                                          Price
                                          Description
                                          Image{
                                            data{
                                              attributes{
                                                url
                                              }
                                            }
                                          }
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
                .then(data => setResponse(data.data.subcategorie.data.attributes))
                .then(result => console.log(result))
        } catch (e) {
            console.log(e)
        }
    }, [])


    return <div className={'main-content'}>
        {response ?
                <ProductBody products={response.products}/>
            : <p>Пустота =(</p>}
    </div>
}
