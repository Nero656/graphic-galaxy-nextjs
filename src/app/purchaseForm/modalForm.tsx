'use client'
import {Form, Input, Modal, Typography} from "antd";
import React, {useState} from "react";
import {store} from "@/redux/store";
import {md5} from "js-md5";

const userInput = () => {
    let [value, setValue] = useState('')

    return {
        bind: {
            value,
            onChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}


interface SubcategoryProps {
    isOpen: boolean
    json: any
    handleOk: () => void
    handleCancel: () => void
}


export default function modalForm({isOpen, handleOk, handleCancel, json}: SubcategoryProps) {
    let telephone = userInput()
    let cardNumber = userInput()
    let cardEnd = userInput()
    let cardName = userInput()
    let cardCVC = userInput()
    let address = userInput()

    let date = new Date()

    let today = date.getDate() + ' ' + (date.getMonth()+1) + ' ' + date.getFullYear()

    let toDeliver = (date.getDate()+5) + ' ' + (date.getMonth()+1) + ' ' + date.getFullYear()

    const query = `mutation CreateOrder($userId: ID!,
     $productList: JSON!, 
     $quantity: Int!
     $email: String!,
     $Telephone: String!,
     $CardNumber: String!,
     $CardEnd: String!,
     $CardName: String!,
     $CardCVC: String!,
     $Address: String!,
     $created: String!,
     $will_deliver: String!,
     ) {
        createOrderList(data: {
            users_permissions_user: $userId,
            product_list: $productList,
            quantity: $quantity,
            email: $email,
            Telephone: $Telephone,
            cardNumber: $CardNumber,
            CardEnd: $CardEnd,
            CardName: $CardName,
            CardCVC: $CardCVC,
            Address: $Address,
            publishedAt: "2021-12-03T20:08:17.740Z",
            created: $created,
            will_deliver: $will_deliver
        }) {
            data {
                attributes {
                    users_permissions_user {
                        data {
                            id
                        }
                    }
                    product_list
                    quantity
                }
            }
        }
    }`

    const variables = {
        userId: store.getState().user?.value.id,
        productList: json,
        quantity: 1,
        email: store.getState().user?.value.email,
        Telephone: telephone.value(),
        CardNumber: md5(cardNumber.value()),
        CardEnd: md5(cardEnd.value()),
        CardName: md5(cardName.value()),
        CardCVC: md5(cardCVC.value()),
        Address: address.value(),
        created: today,
        will_deliver: toDeliver,
    };

    const sendOrder = async () => {
        try {
            const response = await fetch(store.getState().api.value.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables
                })
            });

            const data = await response.json();

            if (data.errors) {
                console.error(data.errors);
            } else {
                handleOk();
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <Modal title="Оформление покупки"
               open={isOpen}
               onOk={sendOrder}
               onCancel={handleCancel}
               okText={'Подтвердить покупку'}
               cancelText={'Отмена'}
        >
            <Form layout="vertical">
                <Form.Item
                    label={'Номер телефона'}
                    name={'telephone'}
                    rules={[{required: true, message: 'Пожалуйста введите свой  номер телефона!'}]}
                >
                    <Input {...telephone.bind}/>
                </Form.Item>

                <Form.Item
                    label={'Номер карты'}
                    name={'card number'}
                    rules={[{required: true, message: 'Пожалуйста введите номер своей карты!'}]}
                >
                    <Input {...cardNumber.bind}/>
                </Form.Item>

                <Form.Item
                    label={'дата окончания'}
                    name={'card end'}
                    rules={[{required: true, message: 'Пожалуйста введите дату окончания срока действия карты!'}]}
                >
                    <Input {...cardEnd.bind}/>
                </Form.Item>


                <Form.Item
                    label={'Имя владельца'}
                    name={'card name'}
                    rules={[{required: true, message: 'Пожалуйста введите имя владельца карты!'}]}
                >
                    <Input {...cardName.bind}/>
                </Form.Item>

                <Form.Item
                    label={'cvc'}
                    name={'cvc'}
                    rules={[{required: true, message: 'Пожалуйста введите cvc!'}]}
                >
                    <Input {...cardCVC.bind}/>
                </Form.Item>

                <Form.Item
                    label={'Адрес'}
                    name={'address'}
                    rules={[{required: true, message: 'Пожалуйста введите cvc!'}]}
                >
                    <Input {...address.bind}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};