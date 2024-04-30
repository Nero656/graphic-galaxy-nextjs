"use client"
import {useState, useEffect} from 'react'
import {SlMenu} from "react-icons/sl";

import type {DrawerProps, RadioChangeEvent} from 'antd';
import {Button, Drawer, Spin} from 'antd';
import Subcategory from "@/app/components/navbar/subcategory/index";

import getRequest from "@/app/components/getRequest";

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

export default function navbar() {

    const [open, setOpen] = useState(false);
    const [openSub, setOpenSup] = useState(false);
    const [placement, setPlacement]
        = useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e: RadioChangeEvent) => {
        setPlacement(e.target.value);
    };


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

    // const [response, setResponse] = useState<any>()

    // useEffect(() => {
    //     try {
    //         setIsLoading(true)
    //         fetch(`http://localhost:1337/api/categories?populate=*`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //             .then(response => response.json())
    //             .then(data => setResponse(data.data))
    //         setIsLoading(false)
    //     } catch (error) {
    //         alert(error)
    //     }
    // }, []);


    // useEffect(() => {
    //      const res =  getRequest(`query {
    //               categories {
    //                 data {
    //                  id
    //                 attributes{
    //                     Name
    //                     subcategories{
    //                       data{
    //                         id
    //                         attributes{
    //                           Name
    //                         }
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //             }`
    //     ).then(data => data)
    //
    //     setResponse(res)
    // }, []);

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

    return <>
        <div className={'navbar'}>
            <Button type="text" onClick={showDrawer} className={'navItem'} icon={<SlMenu/>}/>
            <a href="/" className={'navItem'}> Главная </a>
        </div>

        <Drawer
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
    </>
}
