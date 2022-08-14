import {
  Button,

  Form,
  message,

} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux_toolkit/stores/store";
import { add, deleteContact, editContact } from "../../services/backendCallContact";
import BasicContactForm from "./BasicContactForm";

type SizeType = Parameters<typeof Form>[0]["size"];

const EditContactForm: React.FC = () => {
  const contactInfo=useSelector((state:RootState)=>state.contact)
  const navigate=useNavigate();

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const defaultValue = {
  id: contactInfo.id,
  name: contactInfo.name,
  phoneNumber: contactInfo.phoneNumber,
  favourite: contactInfo.favourite,
  photograph: contactInfo.photograph,
  };

  const onFinish= async (values: any) => {
    console.log(values);
    const body = JSON.stringify({
      name: values.name,
      phoneNumber: values.phoneNumber,
      favourite: Boolean(values.favourite),
      photograph: values.photograph,
      age: values.age,
    });

    
    try {
      const contact = await editContact(body,contactInfo.id);
      message.success(`${contact.message}. Id is ${contact.data.id}`);
      navigate('/contact/list');
    } catch(e) {
      message.error(`${e}`);
    }
  };

  const onFinishFailed = (_values: any) => {
    console.log('fill all values');
  };
  const handleDelete = async(_values: any) => {
      
    try {
      const contact = await deleteContact(contactInfo.id);
      if(contact.data){
      message.success(`${contact.message}. Id is ${contact.data.id}`);
    }else{
      message.error(`${contact.message}`);
    }
      navigate('/contact/list');
    } catch(e) {
      message.error(`${e}`);
    }
  };


  return (
    <Form
      className="form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={defaultValue}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <BasicContactForm/>
      
      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Save changes to Contact
        </Button>
      </Form.Item>
      <Button onClick={handleDelete}>Delete from database</Button>
    </Form>
  );
};

export default EditContactForm;