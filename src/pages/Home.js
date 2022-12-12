import React from 'react';
import { Col, Divider, Image, Layout, PageHeader, Row, Typography } from 'antd';
import YoutubeEmbed from '../components/Home/YoutubeEmbed';
import { Descargas } from './Descargas';
import { Contacto } from './Contacto';
import '../css/basicStyle.css';
import logo from '../file/logo_1.png';
const { Paragraph } = Typography;

const Home = () => {
    const { Title, Paragraph, Text, Link } = Typography;

    return (
        <>
            <Layout>
                <Typography>
                    <Title>
                        <img
                            width={100}
                            src={logo}
                        />
                        Vigilantt
                    </Title>
                    <Paragraph>
                        In the process of internal desktop applications development, many
                        different design specs and implementations would be involved,
                        which might cause designers and developers difficulties and
                        duplication and reduce the efficiency of development.
                    </Paragraph>
                    <Paragraph>
                        After massive project practice and summaries, Ant Design, a design
                        language for background applications, is refined by Ant UED Team,
                        which aims to{' '}
                        <Text strong>
                            uniform the user interface specs for internal background
                            projects, lower the unnecessary cost of design differences and
                            implementation and liberate the resources of design and
                            front-end development
                            <Text mark>『确定』和zMSc;lamsc;lamsclm『自然』</Text>
                        </Text>
                        .
                    </Paragraph>
                    <Title level={2}>Guidelines and Resources</Title>
                    <Paragraph>
                        We supply a series of design principles, practical patterns and
                        high quality design resources (<Text code>Sketch</Text> and{' '}
                        <Text code>Axure</Text>), to help people create their product
                        prototypes beautifully and efficiently.
                    </Paragraph>

                    <Paragraph>
                        <ul>
                            <li>
                                <Link href='/docs/spec/proximity'>Principles</Link>
                            </li>
                            <li>
                                <Link href='/docs/spec/overview'>Patterns</Link>
                            </li>
                            <li>
                                <Link href='/docs/resources'>Resource Download</Link>
                            </li>
                        </ul>
                    </Paragraph>

                    <Paragraph>
                        Press <Text keyboard>Esc</Text> to exit...
                    </Paragraph>

                    <Divider />
                </Typography>
            </Layout>
        </>
    );
};

export default Home;
