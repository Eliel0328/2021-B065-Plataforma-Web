import React, { useContext, useEffect, useState } from 'react';
import {
    Col,
    Divider,
    Layout,
    Row,
    Button,
    Form,
    Switch,
    Spin,
    Typography,
    Input,
    Slider,
    Modal,
    Radio,
} from 'antd';
import { LoginContext } from '../../context/LoginContext';

const { Content } = Layout;
const { confirm } = Modal;
const { Title } = Typography;

export const CambiarContraseña = () => {
    const { updatePassword } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        setTimeout(async () => {
            if (values.nueva_contraseña !== values.confirmar_contraseña) {
                form.setFields([
                    {
                        name: 'confirmar_contraseña',
                        errors: ['Repita la contraseña'],
                    },
                ]);
                setLoading(false);
                return null;
            }

            let aux = await updatePassword(values);
            if (aux === 401) {
                form.setFields([
                    {
                        name: 'contraseña',
                        errors: ['La contraseña es incorrecta'],
                    },
                ]);
            }
            if (aux === 200) {
                form.resetFields();
                setIsModalOpen(false);
            }

            setLoading(false);
        }, 2000);
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type='primary' onClick={showModal}>
                Cambiar Contraseña
            </Button>
            <Modal
                title='Cambiar Contraseña'
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='Contraseña Actual'
                        name='contraseña'
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese su contraseña',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Ingrese su contraseña' />
                    </Form.Item>

                    <Form.Item
                        label='Nueva Contraseña'
                        name='nueva_contraseña'
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese su nueva contraseña',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Ingrese su nueva contraseña' />
                    </Form.Item>

                    <Form.Item
                        label='Confirmar Contraseña'
                        name='confirmar_contraseña'
                        rules={[
                            {
                                required: true,
                                message: 'Confirme su contraseña',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Confirme su contraseña' />
                    </Form.Item>

                    <Form.Item className='center'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                            onClick={() => setLoading(true)}
                        >
                            Cambiar Contraseña
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
