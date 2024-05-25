"use client"
import {useState, useEffect, useCallback} from 'react'
import {SlMenu, SlBasket, SlLogin, SlLogout, SlPeople, SlWallet} from "react-icons/sl"
import {Button, Typography} from 'antd'

import Link from "next/link"

const {Title} = Typography
import Drawer from "@/app/components/navbar/drawer";
import {store} from "@/redux/store";
import {logOut} from "@/redux/features/auth-slice";
import {clearBasket} from "@/redux/features/order-slice";

export default function navbar() {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const showDrawer = () => {
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

    const [jwt, setJwt] = useState<string | null>('')
    const [username, setUsername] = useState<string | null>('')

    useEffect(() => {
        const savedJwt = store.getState().user.value.jwt
        const savedUsername = store.getState().user.value.username

        setJwt(savedJwt ? String(savedJwt) : null)
        setUsername(savedUsername ? String(savedUsername) : null)

    }, [])

    return <>
        <div className={'navbar'}>
            <Button type="text" onClick={showDrawer} className={'navItem'} icon={<SlMenu/>}/>
            <Link href="/" className={'navItem'}> Главная </Link>
            <Link href={'/builder'} className={'navItem'}>
                <Button type="text" > Сборка ПК </Button>
            </Link>
            {jwt === null ?
                <div className={'navbar_auth'}>
                    <Link href={'/authorization/Auth'}><Button type="text" icon={<SlLogin/>}>Войти </Button></Link>
                    <Link href={'/authorization/Registration'}>
                        <Button type="text" icon={<SlPeople/>}>Зарегистрироваться </Button>
                    </Link>
                </div> :
                <div className={'navbar_auth'}>
                        <span
                            style={{cursor: 'pointer'}}
                            onPointerEnter={() => {
                                onShowEnter()
                            }}
                        >
                        {username}
                    </span>

                        <Link href={'/order-list'}>
                            <Button type="text" icon={<SlBasket/>}/>
                        </Link>

                        <Link href={'/list-of-purchased'}>
                            <Button type="text" icon={<SlWallet/>}/>
                        </Link>

                        <Link href={''}>
                            <Button type="text" danger={true} icon={<SlLogout/>}  onClick={() => {
                                store.dispatch(logOut())
                                store.dispatch(clearBasket())
                                location.reload()
                            }}/>
                        </Link>


                </div>
            }
        </div>
        <Drawer open={open} onClose={onClose}/>
    </>
}
