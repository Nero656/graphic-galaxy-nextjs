'use client'
import {List} from "antd";
import {useState} from "react";
import Link from "next/link";


interface SubcategoryProps {
    subcategories:
        {
            data: [{
                id: number,
                attributes: {
                    Name: string
                }
            }]
        },
    name: string,
}

export default function subcategory({subcategories, name}: SubcategoryProps, ) {
    const [open, isOpen] = useState<boolean>(false)

    const Open = () => {
        isOpen(!open)
    }

    return <>
        <List
            size="small"
            header={<span
                className={'navbarList'}
                onClick={event => Open()}>{name}</span>}
            dataSource={subcategories.data}
            renderItem={(item, id) =>
                open ?
                    <List.Item key={id}>
                        <Link href={`/product-list/${item.id}`} >{item.attributes.Name} </Link>
                    </List.Item>
                    : null}
        />
    </>
}