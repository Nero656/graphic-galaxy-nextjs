"use client"
import {useState, useEffect, useCallback} from 'react'
import {SlMenu} from "react-icons/sl"
import {Button, Typography} from 'antd'

import Link from "next/link"

const {Text} = Typography
import Drawer from "@/app/components/navbar/drawer";

export default function navbar() {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const showDrawer = ()=> {
        setOpen(true)
    }

    const onClose = useCallback(() => {
        setOpen(false)
    }, [open]);

    const onShowEnter = () => {
        setShow(true)
    }
    const onShowOut = () => {
        setShow(false)
    }

    const [jwt, setJwt] = useState<string| null>('')
    const [username, setUsername] = useState<string| null>('')

    useEffect(() => {
        const savedJwt = window.localStorage.getItem("jwt")
        const savedUsername = window.localStorage.getItem("username")

        setJwt(savedJwt ? String(savedJwt) : null)
        setUsername(savedUsername ? String(savedUsername) : null)

    }, [])

    return <>
        <div className={'navbar'}>
            <Button type="text" onClick={showDrawer} className={'navItem'} icon={<SlMenu/>}/>
            <a href="/" className={'navItem'}> Главная </a>

            {jwt === null?
                <div className={'navbar_auth'}>
                    <Link href={'/authorization/Auth'}><Button type="text">Войти</Button></Link>
                    <Link href={'/authorization/Registration'}><Button type="text">Зарегистрироваться</Button></Link>
                </div> :
                <div className={'navbar_auth'} onPointerLeave={onShowOut}>
                    <Text

                        style={{cursor: 'pointer'}}
                        onPointerEnter={() => {
                            onShowEnter()
                        }}
                    >
                        {username}
                    </Text>
                    {show === true ?
                        <div className={'user_dropdown'}
                        >
                            <Text
                                  style={{cursor: 'pointer'}}
                                  onClick={() => {}}
                            >
                                Корзина
                            </Text>

                            <Text type={"danger"}
                                  style={{cursor: 'pointer'}}
                                  onClick={() => {
                                localStorage.clear()
                                location.reload()
                            }}
                            >
                                Выйти
                            </Text>
                        </div> : ''
                    }
                </div>
            }
        </div>
        <Drawer open={open} onClose={onClose}/>
    </>
}
