import React, {  useState } from 'react';
import {Form, Input, Button, notification} from "antd"
import { addExamApi } from '../../../../api/exam';


export default function AddExam(props) {
    const {idUser, idCurso, token, setReloaders, setIsVisibleModal} = props;

    const [examData, setExamData] = useState({
        user: idUser,
        cursos: idCurso,
        question: ""
    });
  
    const AddNewQuestion = (e) => {
        e.preventDefault();

       if(!examData?.question || examData?.question === ""){
           notification["error"]({
               message: "Debe colocar una pregunta"
           })
       }else{

        addExamApi(token, examData).then(response => {

            notification["success"]({
                message: response
            })
            setReloaders(true)
            setIsVisibleModal(false)
        })
       }

    }
    


    return (
        <Form  onSubmitCapture={AddNewQuestion} >
      
 
        <Form.Item
          label="Nueva pregunta:"
          name="question"
          className="newQuestion"
          rules={[
            {
              required: true,
              message: "por favor necesita colocar una pregunta!",
            },
          ]}
        >
           
          <Input
           
            
            onChange={(e) =>
              setExamData({ ...examData, question: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
            <Button htmlType="submit" type="primary">Agregar</Button>
        </Form.Item>
      </Form>
    )
}
