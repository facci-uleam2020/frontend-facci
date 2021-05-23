import React from "react";
import { Row, Col, Card } from "antd";
import {
  ClockCircleOutlined,
  KeyOutlined,
  MessageOutlined,
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./HowMYCoursesWork.scss";

export default function HowMYCoursesWork() {
  return (
    <Row className="how-my-courses">
      <Col lg={24} className="how-my-courses__title">
        <h2> ¿Cómo funcionan los cursos?</h2>
        <h3>
          Cada curso estarán activos las 24 horas del día, una vez comprado
          podrás acceder a ellos.
        </h3>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              Icon={ClockCircleOutlined}
              title="Cursos y clases"
              description="Cada cursos tienen entre 10 y 30 horas y cada clase del cursos con duración  máxima de 15 minutos. "
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={KeyOutlined}
              title="Acceso 24/7"
              description="Accede a los cursos en cualquier momento, desde cualquier lugar sin importar el tiempo "
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={MessageOutlined}
              title="Mantente conectado "
              description="Tu profesor estara pendiente  a tu mensaje, dara su contacto por si tiene alguna duda, poder ayudarte"
            />
          </Col>
        </Row>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              Icon={UserOutlined}
              title="Mejora tu perfil de trabajo"
              description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones y a la vanguardia de tu hoja de vida. "
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={DollarOutlined}
              title="Precios bajos"
              description="Obten el curso que necesitas a precios  adecuados y accedes por tiempo ilimitado y soporte ilimitado"
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={CheckCircleOutlined}
              title="Certificados de finalización "
              description="Al completar tu curso recibirás tu certificado enviado desde el docente participativo"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function CardInfo(props) {
  const { Icon, title, description } = props;

  const { Meta } = Card;

  return (
    <Card className="how-my-courses__card">
      <Icon />
      <Meta title={title} description={description} />
    </Card>
  );
}
