import {Button, Card, Divider, Typography} from 'antd';
import {store} from "@/redux/store";
import {deleteProduct} from "@/redux/features/order-slice";
import React from "react";
import {CloseOutlined} from "@ant-design/icons";

interface SubcategoryProps {
    id: number
    title: string
    description: string
    price: number
    url: string
    isBasked: boolean
}

export default function item({id, title, description, price, url, isBasked}: SubcategoryProps) {
    return <Card
        title={title}
        bordered={true}
        hoverable={true}
        extra={isBasked ? <Button type={'text'} danger={true} icon={<CloseOutlined/>}
                                  onClick={(e) => {
            store.dispatch(deleteProduct({id: id}))}}/> : ''}
    >
        <div className={'flex justify-start'}>
            <span className={'subcategory_container'}>
                <span style={{width: '20rem'}}>
                <img width={200} alt="example" src={url}/>
                </span>
                <span className={'subcategory_block'}>
                    <p>{description.substr(0, 175)}...</p>
                    <Divider/>
                    <Typography.Title level={4}>Цена : {price}₽</Typography.Title>
                </span>
            </span>
        </div>
    </Card>
}