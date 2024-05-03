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

const authPost = async (email : string, password: string) => {
    try {
        const resData = await fetch(`http://localhost:1337/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `mutation {
                          login(input: { identifier: "${email}", password: "${password}" }) {
                            jwt
                            user{
                              username
                              email
                            }
                          }
                        }`,
                variables: {}
            })
        })
            .then(response => response.json())
            .then(data => data.data.login)

        console.log(resData, 'nero@gmail.com', 'Nerooo')

        localStorage.setItem('jwt', resData.jwt)
        localStorage.setItem('username', resData.user.username)
        localStorage.setItem('email', resData.user.email)
        location.replace('/')
    }catch (e){
        console.log(e)
    }


}

export default function auth() {
    const [form] = Form.useForm();

    let email = userInput()
    let password = userInput()

    return <div className={'main_authorization'}>
        <Form layout="vertical">
            <Title className={'main_authorization_title'}>Войти</Title>
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
                        authPost(email.value(), password.value())
                    }}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    </div>
}