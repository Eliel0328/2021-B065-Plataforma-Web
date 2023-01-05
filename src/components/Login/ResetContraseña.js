import React, { useContext, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { LoginContext } from '../../context/LoginContext';

export const ResetContraseña = () => {
    const { requestResetPassword } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        setTimeout(async () => {
            let aux = await requestResetPassword(values.correo);
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
            <Button type='ghost' onClick={showModal}>
                Olvide mi contraseña
            </Button>
            <Modal
                title='Olvide mi Contraseña'
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
                        label='Correo'
                        name='correo'
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Ingrese su correo electronico',
                            },
                        ]}
                    >
                        <Input placeholder='Ingrese el correo' />
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
