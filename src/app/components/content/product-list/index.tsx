'use client'
import Item from '@/app/components/content/product-list/item'

interface SubcategoryProps {
    products: {
        data: [{
            id: number,
            attributes: {
                Name: string,
                Description: string,
                Price: number
            }
        }]
    }
}

export default function contentProductBody({products}: SubcategoryProps) {
    return <div className={'main-content'}>
        {products.data.map((item, id) =>
            <Item
                title={item.attributes.Name}
                description={item.attributes.Description}
                price={item.attributes.Price}
                key={id}
            />
        )}
    </div>
}