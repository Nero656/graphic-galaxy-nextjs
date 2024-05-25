'use client'
import {store} from "@/redux/store";
import Item from "@/app/components/content/product-list/item";
import {Button, Card, Empty, Divider, Flex} from "antd";
import {clearBasket} from "@/redux/features/order-slice";
import {useSelector} from "react-redux";
import React, {useCallback, useState} from "react";
import ModalForm from "@/app/purchaseForm/modalForm"
export default function page() {
    useSelector((state) => store.getState().order)

    const [open, setOpen] = useState(false)

    const handleOk = useCallback(() => {
        setOpen(false)
    }, [open]);

    const onCancel = useCallback(() => {
        setOpen(false)
    }, [open]);

    return <main className={'main-content'}>
        <ModalForm isOpen={open} handleOk={handleOk} handleCancel={onCancel} json={store.getState().order?.products}/>
        {store.getState().order?.products.length > 0 ?
            <div className={'order-list'}>
            <div className={'main-content'}>
                {store.getState().order?.products.map((item, id) => (
                    <div key={id}>
                        <Item
                            url={`${store.getState().api?.value.imageUrl}${item.Image}`}
                            title={item.Name}
                            description={item.Description}
                            price={item.Price}
                            isBasked={true}
                            id={id}
                        />
                    </div>
                ))}
            </div>

            <Card
            title={'Ваша корзина'}
            className={'bg-white '} style={{marginTop: '3.5rem', height: '25vh'}}
            >
                <p>
                    Количество товаров ({store.getState().order?.products.length}) :
                </p>
                <p>
                    Цена: {store.getState().order?.products.reduce((acc, num) => acc + num.Price, 0)}₽
                </p>

                <Divider/>
                <Flex gap="small">
                    <Button type={'primary'} onClick={() => {setOpen(true)}}> купить </Button>
                    <Button

                        danger={true}
                        onClick={(e) => {
                            store.dispatch(clearBasket())
                        }}>
                        очистить корзину
                    </Button>
                </Flex>
            </Card>

        </div> : <div className={'main-content'}>
            <Empty description={'корзина пуста'} className={'empty-el bg-white p-3'}/>
        </div>
        }
    </main>
}