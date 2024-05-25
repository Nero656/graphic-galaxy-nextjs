'use client'
import React, {useState} from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import {store} from "@/redux/store";
import {logIn} from "@/redux/features/auth-slice";

const { Title } = Typography;

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


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

export default function Reg(){
    const [form] = Form.useForm();

    let username = userInput()
    let email = userInput()
    let password = userInput()

    const authPost = async (username:string, email : string, password: string) => {
        try {
            const resData = await fetch(`${store.getState().api.value.url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `mutation {
                          register(input: { 
                          username: "${username}",
                          email: "${email}", 
                          password: "${password}" }) {
                            jwt
                            user {
                              id
                              username
                              email
                            }
                          }
                        }`,
                    variables: {}
                })
            })
                .then(response => response.json())
                .then(data => data.data.register)

            store.dispatch(logIn(resData))

            location.replace('/')
        }catch (e){
            console.log(e)
        }
    }


    return<div className={'main_authorization'}>
        <Form layout="vertical">
            <Title className={'main_authorization_title'}>Регистрация</Title>
            <Form.Item
                label={'Имя'}
                name={'username'}
                rules={[{required: true, message: 'Пожалуйста введите своё имя!'}]}
            >
                <Input {...username.bind}/>
            </Form.Item>

            <Form.Item
                label={'Email'}
                name={'email'}
                rules={[{required: true, message: 'Пожалуйста введите свой  email!'}]}
            >
                <Input {...email.bind}/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Пожалуйста введите свой  пароль!' }]}
            >
                <Input.Password  {...password.bind}/>
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 16 }}
            >
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Form.Item  >
                <Button
                    type="primary" htmlType="submit" style={{width: '100%'}}
                    onClick={(e) => {
                        e.preventDefault()
                        authPost(username.value(), email.value(), password.value())
                    }}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    </div>
}