'use client'
import React from 'react';
import {Card, Empty} from 'antd';
import Link from "next/link";

const {Meta} = Card;

export default function item(
    props: {
        category: number,
        title: string,
        img: string,
        price: number,
        chosen: boolean,
        desc: string,
        button?: React.ReactNode
    }) {
    return <Card
        style={{marginTop: 10, height: 300}}
        bordered={true}
        cover={props.chosen === false ? <div>
            {props.button}
            <Link href={`/product-list/${props.category}`}>
                <img alt="example" height={100} src={props.img}/>
            </Link>
        </div> : ''}
        hoverable
    >
        <Link href={`/product-list/${props.category}`}>
            {props.chosen === false ?
                <Meta
                    title={props.title}
                    description={'Цена ' + props.price + '₽'}
                /> : <Empty description={props.desc}/>
            }
        </Link>
    </Card>
}