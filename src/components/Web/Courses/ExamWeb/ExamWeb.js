import React, { useEffect, useState } from "react";
import { getAnswersWebApi } from "../../../../api/answers";
import { getAccessToken } from "../../../../api/auth";
import { getExamWebApi } from "../../../../api/exam";
import { Button, notification, Skeleton } from "antd";
import { Radio, RadioGroup } from "react-custom-radio-buttons";
import CryptoJS from "crypto-js";

import "./ExamWeb.scss";

export default function ExamWeb(props) {
  const { id, user } = props;

  const [exam, setExam] = useState([]);
  const [answ, setAnsw] = useState([]);
  const [results, setResults] = useState({
    user: user?.id,
    cursos: id,
    result: 0,
  });

  const notas = [];

  // useEffect(() => {
  //     getAnswersApi(token, idUser, idQuestion).then((response) => {
  //       setAnswers(response.answers);
  //       //   console.log(response);
  //       setReloaders(false)
  //     });
  //   }, [idUser, idQuestion, token, reloaders]);
  const token = getAccessToken();

  useEffect(() => {
    getExamWebApi(token, id).then(async (response) => {
      setExam(response.exam);

      //   await getAnswersWebApi(token, response.exam?._id).then((response) => {
      //     //   setAnswers(response.answers);
      //         console.log(response);

      //     });

      //   console.log(response);
      //   setReloaders(false)
    });
  }, [id, token, exam?._id]);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    exam?.map((data) => {
      getAnswersWebApi(token, data?._id).then((response) => {
        setAnsw(response.answers);
      });

      //     });
    });
  }, [exam, token]);

  let i = 0;
  let indice = 0;
  const onChange = async (e) => {
    indice++;

    // var bytes = CryptoJS.AES.decrypt(`${e.target.value}`, "123");
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);

    // console.log("radio value", e);
    // console.log("radio checked", e.target.value.answers);
    while (e === true && indice === 1) {
      i++;
      // let resul = (i * 100) / exam.length;
      notas.push(i++);

      console.log(notas);

      // await setResults({ user: user?.id, cursos: id, result: resul });

      break;
    }
    while (e === false && indice === 1) {
      i--;
      let resul = (i * 100) / exam.length;
      notas.push(resul);

      await setResults({ user: user?.id, cursos: id, result: resul });

      break;
    }

    if (indice > 1) {
      return null;
    }

    // if (indice === exam.length) {
    //   setResults({ user: user?.id, cursos: id, result: resul });
    // }

    console.log(indice);

    // if (
    //   e?.target?.value?.correctAnswers === true &&
    //   e.target.checked === false
    // ) {
    //   i--;
    // }
    // if (
    //   e?.target?.value?.correctAnswers === false &&
    //   e.target.checked === true
    // ) {
    //   i--;
    // }
    // if (
    //   e?.target?.value?.correctAnswers === false &&
    //   e.target.checked === false
    // ) {
    //   i++;
    // }
    // if (i < 0) {
    //   i = 0;
    // }
    //     if(e.target.value ===true && e.target.checked ===true ){
    //      i++
    //     }

    //     if(e.target.value ===true && e.target.checked ===true ){
    //      i++
    //     }else {

    //         if(e.target.value ===false && e.target.checked ===true){
    //             i--
    //         }else{
    //             i++
    //         }

    //     }
    //     if(i < 0){
    //         i =0
    //        }
    //        if(  e.target.checked ===false ){
    //         i--
    //        }
  };

  const send = () => {
    console.log("data", notas);
  };

  return (
    <>
      <Skeleton
        active={!exam || exam === [] || !id ? true : false}
        loading={!exam || exam === [] || !id}
      >
        {exam?.map((response, i) => {
          return (
            <h1 key={i} className="question">
              {i + 1}.- {response?.question}
              <br />
              <RadioGroup
                key={response._id}
                containerStyle="options-container"
                onChange={onChange}
              >
                {response.answers?.map((option) => (
                  <Radio
                    key={option._id}
                    value={option?.correctAnswers}
                    render={({ isSelected }) => (
                      <button
                        className="option"
                        style={{
                          backgroundColor: ` ${
                            isSelected ? "#39ab31" : "#f9d10a"
                          } `,
                        }}
                      >
                        {option.answers}
                      </button>
                    )}
                  />
                ))}
              </RadioGroup>
            </h1>
          );
        })}
      </Skeleton>
      <Button onClick={() => send()} type="primary" className="botton">
        Enviar
      </Button>
    </>
  );
}
