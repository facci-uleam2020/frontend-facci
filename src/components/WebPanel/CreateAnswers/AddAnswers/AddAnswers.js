import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { addAnswersApi } from "../../../../api/answers";
import { updateExamPanelApi } from "../../../../api/exam";
import { getAccessToken } from "../../../../api/auth";

export default function AddAnswers(props) {
  const {
    idUser,
    token,
    setReloaders,
    setIsVisibleModal,
    answers,
    idQuestion,
  } = props;

  const [answersData, setAnswersData] = useState({
    user: idUser,
    exam: idQuestion,
    answers: " ",
    correctAnswers: false,
  });
  

  const AddNewAnswers = async(e) => {
    e.preventDefault();

    if (!answersData?.answers || answersData?.answers === "") {
      notification["error"]({
        message: "Debe colocar una respuesta",
      });
    } else {
     await addAnswersApi(token, answersData).then(async (response) => {
          

      let id =response?.an?._id
       await  updateExamPanelApi(token, {answers: id}, idQuestion).then(
        (res) => {
          console.log(res);
        }
      );
      
 
       
        // notification["success"]({
        //   message: response.message,
        // });
   
       
        setReloaders(true);
        setIsVisibleModal(false);
        setAnswersData({
          user: idUser,
          exam: idQuestion,
          answers: "",
          correctAnswers: false,
        });
      });
     
     
      // updateExamPanelApi(token, idAn?._id , idQuestion).then(
      //   (res) => {
      //     console.log(res);
      //   }
      // );
      // console.log(answersData)
    }
  };
  var totalAges = answers?.reduce(
    (sum, value) =>
      typeof value.correctAnswers === "boolean"
        ? value.correctAnswers === true
          ? 1
          : sum
        : sum,
    0
  );

  return (
    <Form onSubmitCapture={AddNewAnswers}>
      <Form.Item
        label="Nueva respuesta:"
        name="answer"
        className="newAnswers"
        rules={[
          {
            required: true,
            message: "por favor necesita colocar una respuesta!",
          },
        ]}
      >
        <Input
          value=" "
          onChange={(e) =>
            setAnswersData({ ...answersData, answers: e.target.value })
          }
        />
      </Form.Item>
      {totalAges === 1 ? (
        ""
      ) : (
        <Form.Item>
          <Checkbox
            onChange={(e) =>
              setAnswersData({
                ...answersData,
                correctAnswers: e.target.checked,
              })
            }
          >
            ¿Es la respuesta correcta?
          </Checkbox>
        </Form.Item>
      )}

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Agregar
        </Button>
      </Form.Item>
    </Form>
  );
}
