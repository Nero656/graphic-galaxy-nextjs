"use client"
import {usePathname} from 'next/navigation'
import ProductBody from '@/app/components/content/product-list/index'
import {useState, useEffect} from 'react'
import Link from "next/link";

type obj = {
    products: {
        data: [{
            id: number,
            attributes: {
                Name: string,
                Description: string,
                Price: number
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
                    }
                }]
            }
        }
    )

    useEffect(() => {
        try {
            fetch(`http://localhost:1337/graphql`, {
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


    console.log(response)

    return <>
        {response ? <Link href={''}> <ProductBody products={response.products}/> </Link> : <p>Пустота =(</p>}
    </>
}
