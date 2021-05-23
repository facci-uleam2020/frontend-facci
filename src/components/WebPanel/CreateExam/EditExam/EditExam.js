import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";

import "./EditExam.scss";
import { updateExamApi } from "../../../../api/exam";

export default function EditExam(props) {
  const { data, token, setReloaders, setIsVisibleModal } = props;
  const [examData, setExamData] = useState({});
  

  useEffect(() => {
    setExamData({
      question: data?.question,
    });
  }, [data]);

  const updateQuestion = (e) => {

    e.preventDefault()
    let examUpdate = examData;
    if(!examUpdate?.question || examUpdate.question === ""){
      
        notification["error"]({
            message: "error coloque la nueva pregunta"
        })

    }else{
        
        updateExamApi(token, examData, data?._id).then(response => {
            notification["success"]({
                message: response.message
            })
            setReloaders(true)
            setIsVisibleModal(false)

        })
    }

    
  }

//   onSubmitCapture={updateCurso}
  
  return (
    <div>
      <Form   onSubmitCapture={updateQuestion}>
       <Form.Item  label="Pregunta formulada:" className="question">
           <p>{data?.question}</p>

       </Form.Item>
 
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
            value={examData.question}
            // initial={examData.question}
            
            onChange={(e) =>
              setExamData({ ...examData, question: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
            <Button htmlType="submit" type="primary">Actualizar</Button>
        </Form.Item>
      </Form>
      
    </div>
  );
}
