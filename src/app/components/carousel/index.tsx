'use client'
import React, {useState, useEffect} from "react";
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import {Card, Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import {store} from "@/redux/store";
import Link from "next/link";
import {Typography} from 'antd'

const {Title} = Typography


const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 8
    },
    desktop: {
        breakpoint: {max: 3000, min: 1900},
        items: 6
    },
    tablet: {
        breakpoint: {max: 1900, min: 1600},
        items: 5
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

const {Meta} = Card

type obj = {
    id: number
    attributes: {
        Name: string
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        }
    }
}


export default function index() {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [subCategory, setSubcategory] = useState([
        {
            id: 0,
            attributes: {
                Name: '',
                image: {
                    data: {
                        attributes: {
                            url: ''
                        }
                    }
                }
            }
        }
    ])

    useEffect(() => {
        try {
            setIsLoading(true)
            fetch(`${store.getState().api.value.url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query{
                      subcategories{
                        data{
                          id
                          attributes{
                            Name
                            image {
                              data{
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
                .then(data => setSubcategory(data.data.subcategories.data))

            // setIsLoading(false)
            setTimeout(setIsLoading, 1000, false)
        } catch (e) {
            console.log(e)
        }
    }, [])

    return <div style={{width: '85%'}}>
        <Title level={2}>Каталоги</Title>
        {isLoading ?  <Spin className={'flex justify-center'} indicator={<LoadingOutlined/>}/> :
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                containerClass="carousel-container"
            >
                <Link href={`/builder`}>
                    <Card
                        style={{width: 240, height: 300, cursor: 'pointer'}}
                        cover={<img alt="example"
                                    src={"https://avatars.dzeninfra.ru/get-zen_doc/3985748/pub_5f5d1965354535081e3de6ae_5f5d1a61354535081e3f31a9/scale_1200"}/>}
                    >
                        <Meta title="Собрать ПК" description="Без проблем с совместимостью"/>
                    </Card>
                </Link>
                {subCategory.map((item, id) =>
                    <Link href={`/product-list/${item.id}`}>
                        <Card
                            key={id}
                            style={{width: 240, height: 300}}
                            cover={
                                <img
                                    alt="example"
                                    style={{height: 170, width: 230}}
                                    src={`${store.getState().api.value.imageUrl}${item.attributes.image.data.attributes.url}`}
                                />
                            }
                        >
                            <Meta title={item.attributes.Name} description="Комплектующиее"/>
                        </Card>
                    </Link>
                )}
            </Carousel>
        }
    </div>
}