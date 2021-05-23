import React, { useEffect, useState } from "react";

import { Form, Button, Input, notification, Checkbox } from "antd";
import { updateAnswerApi } from "../../../../api/answers";

export default function EditAnswers(props) {
  const { data, token, setReloaders, setIsVisibleModal, answers } = props;
  const [answersData, setAnswersData] = useState({});

  useEffect(() => {
    setAnswersData({
      answers: data?.answers,
      correctAnswers: data?.correctAnswers,
    });
  }, [data ]);


  

  const updateAnswers = (e) => {
    e.preventDefault();
    let answersUpdate = answersData;
    if (!answersUpdate?.answers || answersUpdate.answers === "") {
      notification["error"]({
        message: "error coloque la nueva respuesta",
      });
    } else {
      // updateAnswerApi(token, answersData, data?._id).then(response => {
      //     notification["success"]({
      //         message: response.message
      //     })

      //     setIsVisibleModal(false)

      // })
      var totalAges = answers?.reduce(
        (sum, value) =>
          typeof value.correctAnswers === "boolean"
            ? value.correctAnswers === true
              ? 1
              : sum
            : sum,
        0
      );
      

      if (
        totalAges === 1 &&
        JSON.stringify(data?.correctAnswers) === JSON.stringify(answersData?.correctAnswers)
      ) {
        updateAnswerApi(token, answersData, data?._id).then(response => {
            notification["success"]({
                message: response.message,
              });
              setReloaders(true)
              setIsVisibleModal(false)
            //   setAnswersData({ ...answersData, correctAnswers: false, answers: "",  })
        })
        
      } else {
        if (totalAges === 1 && answersData?.correctAnswers === true) {
          notification["error"]({
            message: "error ya existe una respuesta correcta",
          });
          return null;
        } else {
            updateAnswerApi(token, answersData, data?._id).then(response => {
                notification["success"]({
                    message: response.message,
                  });
                  setReloaders(true)
                  setIsVisibleModal(false)
                //   setAnswersData({ ...answersData })
            })
        }
      }
     
    }
  };

  return (
    <Form onSubmitCapture={updateAnswers}>
      <Form.Item label="Respuesta formulada:" className="question">
        <p>{data?.answers}</p>
      </Form.Item>

      <Form.Item
        label="Nueva respuesta:"
        name="answers"
        className="newQuestion"
        
      >
        <Input
          //  value={examData.question}
          // initial={examData.question}

          onChange={(e) =>
            setAnswersData({ ...answersData, answers: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          defaultChecked={data?.correctAnswers}
          checked={answersData?.correctAnswers}
          onChange={(e) =>
            setAnswersData({ ...answersData, correctAnswers: e.target.checked })
          }
        >
          ¿Es la respuesta correcta?
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
}
