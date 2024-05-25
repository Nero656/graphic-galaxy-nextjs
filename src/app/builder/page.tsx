'use client'
import React, {useState, useEffect, useCallback} from 'react';
import {Row, Col, Steps, Button} from 'antd';

import Item from './item/item'
import {store} from "@/redux/store";

import {useSelector} from "react-redux";
import {CloseOutlined} from "@ant-design/icons";
import {clearRam} from "@/redux/features/BuilderSlices/builderRAM-slice";
import {clearCPU} from "@/redux/features/BuilderSlices/builderCPU-slice";
import {clearGPU} from "@/redux/features/BuilderSlices/builderGPU-slice";
import {clearMB} from "@/redux/features/BuilderSlices/builderMotherboard-slice"
import {clearCooling} from "@/redux/features/BuilderSlices/builderCooling-slice";
import {clearSSD} from "@/redux/features/BuilderSlices/builderSSD-slice";
import {clearPowerUnit} from "@/redux/features/BuilderSlices/builderPowerUnit-slice";
import {clearHDD} from "@/redux/features/BuilderSlices/builderHDD-slice";
import {clearCorpus} from "@/redux/features/BuilderSlices/builderCorpus";

import ModalForm from "@/app/purchaseForm/modalForm"

type bodyArray = {
    category: number
    name: string
    Name: string
    Image: string
    Price: number
    chosen: boolean
    desk: string
    funk: () => any
}

export default function page() {

    useSelector((state) => store.getState())

    const [process, setProcess] = useState(true)
    const [count, setCount] = useState(-1)
    const [message, setMessage] = useState('')
    const [ready, setReady] = useState(true)

    const name = [
        store.getState().builderCPU.value.name,
        store.getState().builderGPU.value.name,
        store.getState().builderMotherboard.value.name,
        store.getState().builderRAM.value.name,
        store.getState().builderCooling.value.name,
        store.getState().builderSSD.value.name,
        store.getState().builderPowerUnit.value.name,
        store.getState().builderHDD.value.name,
        store.getState().builderCorpus.value.name
    ]

    const bodyArray: bodyArray[] = [
        {
            category: 1,
            name: `Процессор`,
            Name:  store.getState().builderCPU?.value.name,
            Image: store.getState().builderCPU?.value.img,
            Price: store.getState().builderCPU?.value.price,
            chosen: store.getState().builderCPU?.value.chosen,
            desk: 'процессор не выбран',
            funk: clearCPU
        },
        {
            category: 5,
            name: `Видеокарта`,
            Name:  store.getState().builderGPU?.value.name,
            Image: store.getState().builderGPU?.value.img,
            Price: store.getState().builderGPU?.value.price,
            chosen: store.getState().builderGPU?.value.chosen,
            desk: 'Видеокарта не выбрана',
            funk: clearGPU
        },
        {
            category: 7,
            name: `Материнская плата`,
            Name:  store.getState().builderMotherboard?.value.name,
            Image: store.getState().builderMotherboard?.value.img,
            Price: store.getState().builderMotherboard?.value.price,
            chosen: store.getState().builderMotherboard?.value.chosen,
            desk: 'Материнская плата не выбрана',
            funk: clearMB
        },
        {
            category: 6,
            name: `Оперативная память`,
            Name:  store.getState().builderRAM?.value.name,
            Image: store.getState().builderRAM?.value.img,
            Price: store.getState().builderRAM?.value.price,
            chosen: store.getState().builderRAM?.value.chosen,
            desk: 'Оперативная память не выбрана',
            funk: clearRam
        },
        {
            category: 8,
            name: `Охлаждение процессора`,
            Name:  store.getState().builderCooling?.value.name,
            Image: store.getState().builderCooling?.value.img,
            Price: store.getState().builderCooling?.value.price,
            chosen: store.getState().builderCooling?.value.chosen,
            desk: 'Охлаждение процессора не выбран',
            funk: clearCooling
        },
        {
            category: 9,
            name: `SSD`,
            Name:  store.getState().builderSSD?.value.name,
            Image: store.getState().builderSSD?.value.img,
            Price: store.getState().builderSSD?.value.price,
            chosen: store.getState().builderSSD?.value.chosen,
            desk: 'SSD не выбран',
            funk: clearSSD
        },
        {
            category: 10,
            name: `Блок питания`,
            Name:  store.getState().builderPowerUnit?.value.name,
            Image: store.getState().builderPowerUnit?.value.img,
            Price: store.getState().builderPowerUnit?.value.price,
            chosen: store.getState().builderPowerUnit?.value.chosen,
            desk: 'Блок питания не выбран',
            funk: clearPowerUnit
        },
        {
            category: 11,
            name: `HDD`,
            Name:  store.getState().builderHDD?.value.name,
            Image: store.getState().builderHDD?.value.img,
            Price: store.getState().builderHDD?.value.price,
            chosen: store.getState().builderHDD?.value.chosen,
            desk: 'HDD не выбран',
            funk: clearHDD
        },
        {
            category: 12,
            name: `Корпус`,
            Name:  store.getState().builderCorpus?.value.name,
            Image: store.getState().builderCorpus?.value.img,
            Price: store.getState().builderCorpus?.value.price,
            chosen: store.getState().builderCorpus?.value.chosen,
            desk: 'Корпус не выбран',
            funk: clearCorpus
        }
    ]

    const buildCheck = () => {
        let i = 0
        while (i < name.length) {
            if (name[i] === '') {
                setMessage('Не выбрано')
                setCount(i)
                setProcess(false)
                break
            }

            if (store.getState().builderMotherboard?.value.ram !== store.getState().builderCPU?.value.ram) {
                setProcess(false)
                setMessage('Тип оперативной памяти процессора и материнской платы отличаются')
                setCount(2)
                break
            }

            if (store.getState().builderMotherboard?.value.socket !== store.getState().builderCPU?.value.socket) {
                setProcess(false)
                setMessage('Сокет процессора и мат.платы не совместим')
                setCount(2)
                break
            }

            if (store.getState().builderRAM?.value.ram !== store.getState().builderMotherboard?.value.ram) {
                setProcess(false)
                setMessage('Тип оперативной память не подходит к материнской плате')
                setCount(3)
                break
            }

            setCount(i)
            i++

            setReady(false)
        }
    }

    const [open, setOpen] = useState(false)

    const handleOk = useCallback(() => {
        setOpen(false)
    }, [open]);

    const onCancel = useCallback(() => {
        setOpen(false)
    }, [open]);

    useEffect(() => {
        buildCheck()
    }, [])

    return <div className={'main-content'}>
        <ModalForm isOpen={open} handleOk={handleOk} handleCancel={onCancel} json={bodyArray}/>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{width: '30vw'}}>
                <Row gutter={16}>
                    {bodyArray.map((item, id) =>
                        <Col span={8} key={id}>
                            <Item
                                category={item.category}
                                title={`${item.name}`}
                                img={`${store.getState().api?.value.imageUrl}${item.Image}`}
                                price={item.Price}
                                chosen={item.chosen}
                                desc={item.desk}
                                button={
                                    <Button
                                        type={'text'}
                                        size={'small'}
                                        danger={true}
                                        style={{top: 10, left: 150}}
                                        onClick={() => {
                                            store.dispatch(item.funk())
                                            buildCheck()
                                            setReady(true)
                                        }} icon={<CloseOutlined/>}/>}
                            />
                        </Col>
                    )}
                </Row>
            </div>
            <div>
                <Button
                    type={"primary"}
                    style={{left: 45, top: 10}}
                    disabled={ready}
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    Купить сборку: {bodyArray.reduce((acc, num) => acc + num.Price, 0)}₽
                </Button>
                <Steps
                    style={{marginTop: '1.5rem', marginLeft: 40, height: '25vh', width: '20vw'}}
                    progressDot
                    status={process ? "process" : "error"}
                    current={count}
                    direction="vertical"
                    items={[
                        {
                            title: `Процессор ${store.getState().builderCPU?.value.name}`,
                            description: count >= 0 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `Видеокарта ${store.getState().builderGPU?.value.name}`,
                            description: count >= 1 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `Материнская плата ${store.getState().builderMotherboard?.value.name}`,
                            description: count >= 2 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `Оперативная память ${store.getState().builderRAM?.value.name}`,
                            description: count >= 3 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `Охлаждение процессора ${store.getState().builderCooling?.value.name}`,
                            description: count >= 4 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `SSD ${store.getState().builderSSD?.value.name}`,
                            description: count >= 5 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `Блок питания ${store.getState().builderPowerUnit?.value.name}`,
                            description: count >= 6 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `HDD ${store.getState().builderHDD?.value.name}`,
                            description: count >= 7 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                        {
                            title: `Корпус ${store.getState().builderCorpus?.value.name}`,
                            description: count >= 8 ? process ? 'Всё прошло успешно' : message : 'Не пройдено',
                        },
                    ]}
                />
            </div>
        </div>
    </div>
}