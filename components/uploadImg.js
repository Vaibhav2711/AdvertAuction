import React, { useState , Component} from "react";
import {Button,Input} from 'semantic-ui-react';

const UploadAndDisplayImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {parentCallBack} = props;

  return (
      <Input
        type="file"
        name="myImage"
        onChange = { (event) =>{
          console.log(event.target.files[0].name);
          setSelectedImage(URL.createObjectURL(event.target.files[0]));
          console.log(setSelectedImage);
          console.log(URL.createObjectURL(event.target.files[0]));
          parentCallBack(URL.createObjectURL(event.target.files[0]));
        }}
        action>
      </Input>
  );
};

export default UploadAndDisplayImage;
