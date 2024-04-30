import { Card} from 'antd';

interface SubcategoryProps {
    title: string,
    description: string,
    price: number
}

export default function item({title, description, price}: SubcategoryProps) {
    return <>
        <Card title={title} bordered={true}>
            <p>{description}</p>
            <p>{price}</p>
        </Card>
    </>
}