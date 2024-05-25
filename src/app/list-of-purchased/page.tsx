'use client'
import {store} from "@/redux/store";
import {Typography,  Card, Col, Empty, Row} from "antd";
import {useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import ModalForm from "@/app/purchaseForm/modalForm";

const { Title } = Typography;

type OrderData = {
    id: number

    attributes: {
        product_list: any[]
        created: string
        will_deliver: string
        quantity: number
    }
};

type ResponseType = {
    orderLists: {
        data: OrderData[]
    }
};

export default function Page() {
    useSelector((state) => store.getState().order);

    const [open, setOpen] = useState(false);

    const handleOk = useCallback(() => {
        setOpen(false);
    }, [open]);

    const onCancel = useCallback(() => {
        setOpen(false);
    }, [open]);

    const [response, setResponse] = useState<ResponseType | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${store.getState().api.value.url}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `query {
                          orderLists(filters: {users_permissions_user: {id: {eq: ${store.getState().user?.value.id}}}}){
                            data{
                              id
                              attributes{
                                product_list
                                quantity
                                created
                                will_deliver
                              }
                            }
                          }
                        }`,
                        variables: {}
                    })
                });

                const data = await response.json();
                if (data && data.data) {
                    setResponse(data.data);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className={'main-content'}>
            <ModalForm
                isOpen={open}
                handleOk={handleOk}
                handleCancel={onCancel}
                json={store.getState().order?.products}
            />
            {store.getState().order?.products.length > 0 ? (
                <div className={'order-list'}>
                    <div className={'main-content'}>
                        {response && response.orderLists ? (
                            response.orderLists.data.map((item, id) => (
                                <div key={id} className={'p-3'}>
                                    <Title level={3}>Список покупок от {item.attributes.created} </Title>
                                    <Row gutter={16}>
                                        {item.attributes.product_list.map((product, productId) => (
                                            <Col span={8} key={productId}>
                                                <Card style={{marginTop: 10}}
                                                      title={product.Name}
                                                      extra={'оплачено'}
                                                      cover={<img alt="example"
                                                                  height={100}
                                                                  src={store.getState().api?.value.imageUrl + product.Image}
                                                      />}
                                                >
                                                    {product.Price}
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Title level={3}>Прибудет: {item.attributes.will_deliver} </Title>
                                </div>
                            ))
                        ) : (
                            <Empty description={'корзина пуста'} className={'empty-el bg-white p-3'}/>
                        )}
                    </div>
                </div>
            ) : (
                <div className={'main-content'}>
                    <Empty description={'корзина пуста'} className={'empty-el bg-white p-3'}/>
                </div>
            )}
        </div>
    );
}
