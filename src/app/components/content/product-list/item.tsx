import {Card} from 'antd';

interface SubcategoryProps {
    title: string,
    description: string,
    price: number
    url: string
}

export default function item({title, description, price, url}: SubcategoryProps) {
    return <>
        <Card
            title={title}
            bordered={true}
        >
            <span className={'subcategory_container'}>
                <img width={200} alt="example" src={url}/>
                <span className={'subcategory_block'}>
                    <p>{description}</p>
                    <p>{price}</p>
                </span>
            </span>
        </Card>
    </>
}