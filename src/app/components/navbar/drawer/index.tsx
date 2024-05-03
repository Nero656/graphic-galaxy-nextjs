'use client'
import React, {useEffect, useState} from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import {Drawer, Spin} from 'antd';
import Subcategory from "@/app/components/navbar/subcategory";

type obj = {
    attributes: {
        Name: string
        Is_deleted: boolean,
        subcategories: {
            data: [
                {
                    id: number
                    attributes: { Name: string }
                }
            ]
        }
    }
}

interface drawerProps {
    open: boolean,
    onClose: () => void
}
export default function drawer({open, onClose}: drawerProps){
    const [openSub, setOpenSup] = useState(false)
    const [placement, setPlacement]
        = useState<DrawerProps['placement']>('left')


    const onCloseSubCategory = (id: number) => {
        setOpenSup(!openSub)
    }

    const [isLoading, setIsLoading] = useState<boolean>()

    const [response, setResponse] = useState<[obj]>([
        {
            attributes: {
                Name: "",
                Is_deleted: false,
                subcategories: {
                    data: [
                        {
                            id: 0,
                            attributes: {Name: ''}
                        }
                    ]
                }
            }
        }
    ])

    useEffect(() => {
        try {
            setIsLoading(true)
            fetch(`http://localhost:1337/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query {
                          categories {
                            data {
                             id
                            attributes{
                                Name
                                subcategories{
                                  data{
                                    id
                                    attributes{
                                      Name
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
                .then(data => setResponse(data.data.categories.data))
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }, [])


    return <Drawer
        title="Категории"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
    >
        {isLoading ? <Spin className={'navItem'}/> :
            isLoading === false && response.map((item, id) =>
                <span key={id} className={'navItem'}
                      onClick={(e) => {
                          onCloseSubCategory(id)
                      }}>
                        <Subcategory name={item.attributes.Name}
                                     subcategories={item.attributes.subcategories}/>
                    </span>
            )}
    </Drawer>
}