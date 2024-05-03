'use client'
import React, {useState} from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';

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

const authPost = async (username:string, login: string, email : string, password: string) => {
    try {
        const resData = await fetch(`http://localhost:1337/graphql`, {
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

        localStorage.setItem('jwt', resData.jwt)
        localStorage.setItem('username', resData.user.username)
        localStorage.setItem('email', resData.user.email)

        location.replace('/')
    }catch (e){
        console.log(e)
    }

}

export default function Reg(){
    const [form] = Form.useForm();

    let username = userInput()
    let login = userInput()
    let email = userInput()
    let password = userInput()

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
                label={'Логин'}
                name={'login'}
                rules={[{required: true, message: 'Пожалуйста введите свой логин!'}]}
            >
                <Input {...login.bind}/>
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
                        authPost(username.value(), login.value(), email.value(), password.value())
                    }}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    </div>
}