'use client'
import React, {useEffect, useState} from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import {Drawer, Spin} from 'antd';
import { createStyles, useTheme } from 'antd-style';
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import Subcategory from "@/app/components/navbar/subcategory";
import {store} from '@/redux/store'

// const useStyle = createStyles(({ token }) => ({
//     'my-drawer-body': {
//         backgroundColor: `rgba(255, 0, 0, 0.06)`,
//     },
//     'my-drawer-mask': {
//         boxShadow: `inset 0 0 15px #fff`,
//     },
//     'my-drawer-header': {
//         background: 'rgba(255,255,255,0.06)',
//     },
// }));


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

    const token = useTheme();
    // const { styles } = useStyle()

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

    const classNames: DrawerClassNames = {
        // body: styles['my-drawer-body'],
        // mask: styles['my-drawer-mask'],
        // header: styles['my-drawer-header'],
    };

    const drawerStyles: DrawerStyles = {
        mask: {
            backdropFilter: 'blur(10px)',
        },
        content: {
            boxShadow: '-10px 0 10px #666',
        },
        header: {
            borderBottom: `1px solid ${token.colorPrimary}`,
        },
        body: {
            fontSize: token.fontSizeLG,
        },
        footer: {
            borderTop: `1px solid ${token.colorBorder}`,
        },
    };

    useEffect(() => {
        try {
            setIsLoading(true)
            fetch(`${store.getState().api.value.url}`, {
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
        classNames={classNames}
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