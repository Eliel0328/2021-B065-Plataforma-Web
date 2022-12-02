import React, { useContext, useState } from 'react';
import { Col, Layout, Row, Button } from 'antd';

import { DatePicker, Space } from 'antd';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import alertTopEnd from '../../helpers/alertTopEnd';
import { DashboardContext } from '../../context/DashboardContext';

const { Header, Content, Footer } = Layout;
const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
];

export const GraficaIncidenciasByWeek = () => {
    const { incidencias, getIncidencias } = useContext(DashboardContext);

    const [inicial, setIncial] = useState(null);
    const [final, setFinal] = useState(null);

    const [loadings, setLoadings] = useState(false);

    const enterLoading = () => {
        if (inicial === null || final === null) {
            alertTopEnd(
                'warning',
                'Fechas no seleccionadas',
                'Seleccione las fechas que desea buscar'
            );
        } else {
            setLoadings(true);
            getIncidencias(inicial, final);
            setTimeout(() => {
                setLoadings(false);
            }, 1000);
        }
    };

    const addDays = (actual, days) => {
        let aux = new Date(actual);
        aux.setDate(aux.getDate() + days);
        return aux;
    };

    const onChange = (date, dateString) => {
        if (dateString === '') {
            setIncial(null);
            setFinal(null);
        } else {
            let curr = new Date(date._d);
            let first = curr.getDate() - curr.getDay();
            let firstday = new Date(curr.setDate(first));
            let lastday = addDays(firstday, 6);

            setIncial(firstday);
            setFinal(lastday);
        }
    };

    return (
        <>
            <Layout className='layout'>
                <Content
                    style={{
                        padding: '10px 100px',
                    }}
                >
                    <Row>
                        <Col
                            style={{
                                padding: 10,
                                minWidth: 300,
                            }}
                        >
                            <DatePicker onChange={onChange} picker='week' />
                            <Button
                                type='primary'
                                loading={loadings}
                                onClick={() => enterLoading()}
                            >
                                Click me!
                            </Button>
                        </Col>
                        <Col>
                            <VictoryChart
                                // domainPadding will add space to each side of VictoryBar to
                                // prevent it from overlapping the axis
                                domainPadding={20}
                            >
                                <VictoryAxis
                                    // tickValues specifies both the number of ticks and where
                                    // they are placed on the axis
                                />
                                <VictoryAxis
                                    dependentAxis
                                    // tickFormat specifies how ticks should be displayed
                                    tickFormat={(x) => `${x}`}
                                />
                                <VictoryBar data={incidencias} x='dia' y='data' />
                            </VictoryChart>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};
