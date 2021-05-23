/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
import {
  Button,
  PageHeader,
  Typography,
  Row,
  Col,
  Card,
  Affix,
  Collapse,
  Descriptions,
  Image,
  notification,
  Spin,
} from "antd";
import "./CourseDescriptions.scss";

import {
  Document,
  Page,
  Image as ImageReact,
  Text,
  PDFDownloadLink,
  StyleSheet,
  Canvas,
  View,
} from "@react-pdf/renderer";

import { getCursoOneApi, getImgCurso } from "../../../../../api/curso";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import NoVideo from "../../../../../assets/img/jpg/no-video.jpg";
import {
  PlayCircleOutlined,
  RightOutlined,
  LikeOutlined,
  DownloadOutlined,
  StarOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { getUserWeb } from "../../../../../api/user";
import useAuth from "../../../../../hooks/useAuth";
import {
  getSeccionOneApi,
  getSeccionWebApi,
  getVideoSeccion,
} from "../../../../../api/seccion";
import { getCompraApi, getPurchaseApi } from "../../../../../api/compras";
import { getAccessToken } from "../../../../../api/auth";
import { addCarrito } from "../../../../../api/carrito";
import LogoFacci from "../../../../../assets/img/png/logoFaci.png";
import LogoUleam from "../../../../../assets/img/png/LOGO-ULEAM-HORIZONTAL.png";
import student from "../../../../../assets/img/png/estudiante.png";
import Certificatee from "../../../../../assets/img/png/cer.png";
import teacher from "../../../../../assets/img/png/ensenanza.png";
import teacherLin from "../../../../../assets/img/png/firma-sello.png";

import Modal from "../../../../Modal";
import ExamWeb from "../../ExamWeb/ExamWeb";
import { Helmet } from "react-helmet";

export default function CourseDescriptions(props) {
  const { id, cursoId } = props;
  const { Paragraph } = Typography;
  const { Panel } = Collapse;
  const { Meta } = Card;
  const [img, setImg] = useState(null);
  const [courses, setCourses] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const [video, setVideo] = useState(null);
  const [userId, setUserId] = useState([]);
  const [idSeccion, setIdSeccion] = useState(null);
  const [compra, setCompra] = useState(null);
  const [VideoSeccion, setVideoSeccion] = useState(null);
  const [compraMap, setCompraMap] = useState([]);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [existPurchase, setExistPurchase] = useState([]);
  // getPurchaseApi

  const { user, isLoading } = useAuth();
  const antIcon = (
    <LoadingOutlined twoToneColor="#fff" style={{ fontSize: 24 }} spin />
  );

  const token = getAccessToken();
  const carritoData = {
    user: user?.id,
    cursos: courses?._id,
    estado: true,
  };
  let courseImg = courses?.img;

  useEffect(() => {
    getCursoOneApi(id ? id : cursoId).then((response) => {
      setCourses(response.cursos);
    });
    // eslint-disable-next-line no-unused-expressions
    user && !isLoading
      ? getCompraApi(token, user.id, id ? id : cursoId).then((response) => {
          setCompra(response.compras);
        })
      : null;

    courses?.img
      ? getImgCurso(courseImg).then((response) => {
          setImg(response);
        })
      : setImg(null);
  }, [id, courseImg, isLoading, user, token, cursoId]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    courses?.user
      ? getUserWeb(courses?.user).then((response) => {
          setUserId(response.Stored);
        })
      : false;
  }, [courses]);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    courses?._id
      ? getSeccionWebApi(courses?._id).then((response) => {
          setSeccion(response.seccion);
        })
      : false;
  }, [courses]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    compra?.map((com) => {
      setCompraMap(com);
      // console.log(com);
    });
    getPurchaseApi(token, user?.id, courses?._id).then((response) => {
      setExistPurchase(response.Stored)
    })
  }, [compra]);

  

  useEffect(() => {
    if (seccion) {
      // eslint-disable-next-line no-unused-expressions
      seccion[0]?.video
        ? getVideoSeccion(seccion[0]?.video).then((response) => {
            setVideo(response);
          })
        : false;
    } else {
      setVideo(null);
    }
  }, [seccion]);
  var totalAges = seccion?.reduce(
    (sum, value) =>
      value.recurso !== "" || value.recurso === undefined ? sum + 1 : sum,
    0
  );

  const OnVideo = (video) => {
    // eslint-disable-next-line no-unused-expressions
    video[0]
      ? getSeccionOneApi(video[0]).then((response) => {
          // eslint-disable-next-line no-unused-expressions
          response?.Stored?.video
            ? getVideoSeccion(response?.Stored?.video).then((response) => {
                setVideoSeccion(response);
              })
            : notification["error"]({
                message: "Esta clase no tiene video",
                style: { marginTop: 60 },
              });
        })
      : notification["error"]({
          message: "Esta clase no tiene video",
          style: { marginTop: 80 },
        });
  };
  const onEdit = (video) => {
    setIdSeccion(video);
  };
  

  const content = (
    <>
      <Paragraph className="description">{courses?.description}</Paragraph>
      <Paragraph className="text-teacher" style={{ marginBottom: 0 }}>
        Creado por : {userId?.name} {userId?.lastname}
        <br />
        <br />
        <br />
        <br />
      </Paragraph>
      {/* <div>
			<IconLink
			  src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
			  text="Quick Start"
			/>
			<IconLink
			  src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
			  text=" Product Info"
			/>
			<IconLink
			  src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
			  text="Product Doc"
			/>
		  </div> */}
    </>
  );

  const Anadir = () => {
    setSignUpLoading(true);

    addCarrito(token, carritoData).then((response) => {
      notification["success"]({
        message: response,
        style: { marginTop: 50 },
      });

      setSignUpLoading(false);
    });
  };

  return (
    <>
      <Row>
        {/* <Col md={4} style={{ backgroundColor: '#f5f5f5', height: 327 }}></Col> */}

        <Col md={15} xs={24} style={{ paddingLeft: "17%", marginBottom: "5%" }}>
          <div className="cursos">
            <br />
            <div className="link">
              <Link to="/courses">
                <Button type="link">Cursos </Button>
              </Link>
              <h3 style={{ marginLeft: -1 }}>
                <RightOutlined />
              </h3>
              <Link to={`/courses/${courses?._id}`}>
                <Button type="link">{courses?.name} </Button>
              </Link>
            </div>
          </div>
          <PageHeader
            ghost={false}
            className="site-page-header"
            title={courses?.name}
          >
            {content}
          </PageHeader>
          {(compraMap?.cursos?._id === id && cursoId === undefined) ||
          (id === undefined && cursoId === compraMap?.cursos?._id) ? (
            ""
          ) : (
            <Descriptions
              title="Informacion del docente"
              layout="vertical"
              className="teacher"
              style={{
                marginTop: 40,
                marginRight: 10,
                padding: 24,
                borderRadius: 20,
              }}
            >
              <Descriptions.Item label="Descripcion">
                {userId?.description}
              </Descriptions.Item>
            </Descriptions>
          )}
          ,
        </Col>

        <Col
          md={7}
          xs={24}
          style={{ padding: 24, marginBottom: 89, marginTop: 90 }}
        >
          <Affix offsetTop={10} style={{ marginTop: 30 }}>
            <div className="cursos">
              {(compraMap?.cursos?._id === id && cursoId === undefined) ||
              (id === undefined && cursoId === compraMap?.cursos?._id) ? (
                <Nuevo VideoSeccion={VideoSeccion} />
              ) : (
                <Card
                  style={{ borderRadius: 20, width: "80%" }}
                  cover={
                    <ReactPlayer
                      className="reproductor"
                      url={video}
                      playing={true}
                      controls={true}
                      light={img}
                      width="100%"
                      height="210px"
                      wrapper="div"
                    ></ReactPlayer>
                  }
                >
                  <Meta
                    title={`$ ${courses?.price}`}
                    description="¡Compralo ahora!"
                  />

                  <Button className="anadir" onClick={() => Anadir()}>
                    {signUpLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      "Añadir al carrito"
                    )}
                  </Button>
                  <Link
                    to={{
                      pathname: `/courses/${courses?._id}/purchase`,
                      state: `${courses?._id}`,
                    }}
                  >
                    <Button type="default" className="comprar">
                      Comprar ahora
                    </Button>
                  </Link>
                  <span className="text-boton">
                    Atreve a optar por este curso
                  </span>
                  <h3 className="incluye">Este curso incluye:</h3>
                  <h3>
                    <PlayCircleOutlined />
                    &nbsp;{seccion?.length} Secciones
                  </h3>
                  <h3>
                    <DownloadOutlined />
                    &nbsp;
                    {totalAges === undefined ? "0" : totalAges}
                    &nbsp;Recursos descargables
                  </h3>
                  <h3>
                    <LikeOutlined />
                    &nbsp;Acceso de por vida
                  </h3>
                  <h3>
                    <StarOutlined />
                    &nbsp;Certificado de finalizacion
                  </h3>
                </Card>
              )}
            </div>
          </Affix>
        </Col>

        <Col md={2} style={{ height: 426 }}></Col>
      </Row>
      <Row style={{ marginBottom: 50, marginTop: -100 }}>
        <Col md={4}></Col>
        <Col xs={24} md={11}>
          <h2 className="titulo">Contendido del Curso</h2>

          {seccion.map((seccion, i) => (
            <Collapse key={seccion?._id} collapsible="header" onChange={onEdit}>
              <Panel header={seccion?.name} key={seccion?._id}>
                {seccion?.description}
                {(compraMap?.cursos?._id === id && cursoId === undefined) ||
                (id === undefined && cursoId === compraMap?.cursos?._id) ? (
                  <Button
                    style={{ marginTop: 15, marginBottom: 10, float: "right" }}
                    onClick={() => OnVideo(idSeccion)}
                  >
                    Ver video
                  </Button>
                ) : (
                  <Button
                    style={{ marginTop: 15, marginBottom: 10, float: "right" }}
                    disabled={true}
                  >
                    Ver video
                  </Button>
                )}
                {(compraMap?.cursos?._id === id && cursoId === undefined) ||
                (id === undefined && cursoId === compraMap?.cursos?._id) ? (
                  seccion.recurso ? (
                    <a
                      style={{
                        textAlign: "left",
                        marginTop: "2%",
                        color: "blue",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={seccion?.recurso}
                    >
                      Ver recurso
                    </a>
                  ) : (
                    ""
                  )
                ) : // <Button style={{ marginTop: 15, marginBottom: 10, float: 'right' }} disabled={true}>
                // 	Ver video
                // </Button>
                null}
              </Panel>
            </Collapse>
          ))}
          {/* <Collapse defaultActiveKey={['1']}>
						<Panel header="This is panel header 1" key="1">
							<p>text</p>
						</Panel>
						<Panel header="This is panel header 2" key="2">
							<p>text</p>
						</Panel>
						<Panel header="This is panel header 3" key="3">
							<p>text</p>
						</Panel>
					</Collapse> */}
        </Col>
        <Col md={5}></Col>
      </Row>


      <PdfRende user={user} existPurchase={existPurchase} token ={ token} cursoId={cursoId} courses={courses} isLoading={isLoading} />
    </>
  );
}

function Nuevo(props) {
  const { VideoSeccion } = props;

  return (
    // <h1>hola</h1>
    VideoSeccion ? (
      <ReactPlayer
        url={VideoSeccion}
        playing={true}
        controls={true}
        // light={NoVideo}
        width="500px"
        height="295px"
        wrapper="div"
      ></ReactPlayer>
    ) : (
      <Image
        preview={false}
        src={NoVideo}
        style={{
          width: "500px",
          height: "295px",
          marginBottom: 49,
          marginTop: 30,
          borderRadius: 20,
        }}
      />
    )
  );
}

function PdfRende(props) {
  const { user, courses,  token, existPurchase } = props;

  const id = courses?._id;
 

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  const addAnswersModal = () => {
    setIsVisibleModal(true);
    setModalTitle(`Examen de ${courses?.name}`);
    setModalContent(
      // <AddAnswers
      //   setIsVisibleModal={setIsVisibleModal}
      //   answers={answers}
      //   idQuestion={idQuestion}
      //   idCurso={idCurso}
      //   idUser={idUser}
      //   setReloaders={setReloaders}
      //   token={token}

      // />
        
      <ExamWeb id={id} user={user} />
    );
  };
  const style = {
    marginTop: 80,
  };
  
const [state, setState] = useState({
  ready: false,
});


function toogle() {
  setState(
    setTimeout(() => {
      setState({ ready: true });
    }, 1)
  );
}
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    // height: 1000
    paddingVertical: 35,
    // backgroundColor: "#D9F5F7"
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    // fontFamily: 'Oswald'
    color: "#2296ff",
    marginTop: 80,
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    // marginBottom: 40,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    // fontFamily: 'Oswald'
    textAlign: "center",
  },
  text: {
    // margin: 12,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Times-Roman",
    marginTop: 20,
  },
  text2: {
    // margin: 12,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 700,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  circle: {
    width: 100,
    height: 100,
  },
  view: {
    width: "100%",
    height: "100%",
    padding: 0,
    backgroundColor: "white",
  },
});

const MyDocument = (
  <Document>
    <Page style={styles.body} orientation="landscape">
      {/* <ImageReact src={LogoFacci} alt="logo" style={{width: 100, height: 20 , position: "absolute" , marginLeft: "5%" , marginTop:" 5%"} }/>
  <ImageReact src={LogoUleam} alt="logo" style={{width: 100, height: 150, marginLeft: '89%' , position: "absolute",  marginTop:5 }}/> */}

      <Canvas
        // debug={true}

        paint={(painter) => [
          painter.rect(20, 20, 802, 558).stroke("#1870F7").lineWidth(800),
        ]}
        style={{
          width: 835,
          height: 700,
          display: "block",
          position: "absolute",
        }}
      />

      {/* <ImageReact src={Logo}   alt="images" /> */}

      {/* <ImageReact src="https://pbs.twimg.com/profile_images/988272404915875840/lE7ZkrO-_400x400.jpg" style={{width: 10}} /> */}

      <Text style={styles.header} fixed>
        ~ Universidad Laica Eloy Alfaro de Manabi ~
      </Text>
      <Text style={styles.subtitle}>FACULTAD DE CIENCIAS INFORMATICA</Text>

      {/* {courses ? <ImageReact src={Logo} />: null} */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <ImageReact
          src={LogoUleam}
          alt="logo"
          style={{ width: 70, height: 70, marginRight: 20 }}
        />
        <ImageReact
          src={LogoFacci}
          alt="logo"
          style={{ width: 60, height: 20, marginTop: 25 }}
        />
      </View>

      <Text style={styles.title}>
        {user?.name} {user?.lastname}
      </Text>
      {/* fillAndStroke("#fff") */}
      {/* <Text style={styles.author}>certifica a :</Text> */}
      <Text style={styles.text}>
        recibe este certificado por haber finalizado con éxito el exámen de
        certificación llevado a cabo por la Facultad de Ciencias informática
        mismo que es evaluado por la Uleam, gracias por tomar el curso
      </Text>
      <Text style={styles.text2}>{courses?.name}</Text>

      {/* {courses?.name}  */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <View
          style={{
            backgroundColor: "#E8E8E8",
            borderRadius: 50,
            height: 65,
            width: 65,
            marginRight: 20,
            marginLeft: 140,
          }}
        >
          <ImageReact
            src={student}
            alt="logo"
            style={{
              width: 50,
              height: 50,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 5,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#E8E8E8",
            borderRadius: 50,
            height: 65,
            width: 65,
            padding: 4,
            marginRight: 20,
          }}
        >
          <ImageReact
            src={Certificatee}
            alt="logo"
            style={{
              width: 50,
              height: 50,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 5,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#E8E8E8",
            borderRadius: 50,
            height: 65,
            width: 65,
            padding: 4,
            marginRight: 20,
          }}
        >
          <ImageReact
            src={teacher}
            alt="logo"
            style={{
              width: 50,
              height: 50,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 5,
            }}
          />
        </View>
        <View
          style={{
            borderRadius: 50,
            height: 65,
            width: 65,
            padding: 4,
            marginLeft: 100,
            marginTop: 30,
          }}
        >
          <ImageReact
            src={teacherLin}
            alt="logo"
            style={{
              width: 100,
              height: 90,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 5,
            }}
          />
        </View>
      </View>

      {/* <View style={{backgroundColor: '#E8E8E8', borderRadius: 50  , height: 65, width: 65, float: "left"}}>
     <ImageReact src={teacherLin} alt="logo" style={{width: 40, height: 40}}/>
    </View> */}

      {/* <View>
    <ImageReact src={LogoUleam} alt="logo" style={{width: 100, height: 100}}/>
    </View> */}
      {/* <ImageReact src={LogoUleam} alt="logo" style={{width: 100, height: 100}}/> */}

      {/* <ImageReact src={LogoFacci} alt="logo" style={{width: 100, height: 40  , marginLeft: "5%" } }/> */}
      {/* <Text style={styles.text}>
      firma
    </Text> */}
      {/* <ImageReact src={LogoUleam} alt="logo" style={{width: 100, height: 150, marginLeft: '89%'  }}/> */}
    </Page>
  </Document>
);







  return (
   <>
    <Helmet>
		  <title>Cursos-Ver | Facci-Uleam</title>
	  </Helmet>
    <Row>
<Col md={4} ></Col>
   
<Col md={4} >
   
<p>
        {existPurchase  === undefined || !token  ? " " :     state?.ready && (
          <PDFDownloadLink document={MyDocument} fileName="somename.pdf">
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : <Button>Descargar Certificado</Button>
            }
          </PDFDownloadLink>
        ) }
        {existPurchase  === undefined || !token  ? " " :  !state?.ready && (
          <Button onClick={() => toogle()}>Generar certificado</Button>
        )}
     
     </p>
     </Col>
     <Col md={4} ></Col>
     </Row>
  
 </>
  );
}
