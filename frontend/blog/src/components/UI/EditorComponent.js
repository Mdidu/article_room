import React from "react";
import { Editor } from "react-draft-wysiwyg";

const imageUploadCallBack = (file) =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let img = new Image();
    reader.onload = function (e) {
      img.src = this.result;
    };

    img.onload = function () {
      //Get the image
      // Zoom the image needed canvas (can also directly define the canvas tag in the DOM, so that the compressed image can be directly displayed without rotating base64)
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");

      // image original size
      let originWidth = this.width;
      let originHeight = this.height;

      // Maximum size limit, you can achieve image compression by setting the width and height
      let maxWidth = 400,
        maxHeight = 500;
      // target size
      let targetWidth = originWidth,
        targetHeight = originHeight;
      // Image size exceeds 300x300 limit
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // wider, limited by width
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
      // canvas scales the image
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // clear the canvas
      context.clearRect(0, 0, targetWidth, targetHeight);
      // Image Compression
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      /* The first parameter is the created img object; the second three parameters are the upper left corner coordinates, the latter two are the canvas area width and height */

      // compressed image to base64 url
      /*canvas.toDataURL(mimeType, qualityArgument), mimeType The default value is 'image/png';
       * qualityArgument indicates the quality of the exported image. This parameter is valid only when exported to jpeg and webp format. The default value is 0.92*/
      let newUrl = canvas.toDataURL("image/jpeg", 0.92); //base64 format

      resolve({
        data: {
          link: newUrl,
        },
      });
    };
  });

const EditorComponent = (props) => {
  return (
    <div>
      <Editor
        editorState={props.editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={props.onEditorStateChange}
        editorStyle={{ border: "2px solid black", backgroundColor: "white" }}
        toolbar={{
          image: {
            uploadCallback: imageUploadCallBack,
            previewImage: true,
            alt: { present: true, mandatory: false },
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
          },
        }}
      />
    </div>
  );
};

export default EditorComponent;
