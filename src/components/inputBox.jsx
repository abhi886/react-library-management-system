import React, { useRef } from "react";

function InputBox({ Image, addImageToPost, removeImage }) {
  const filepickerRef = useRef(null);
  return (
    <div className='customImageUploader'>
      <p className='mt-2'>UPLOAD IMAGE </p>
      <input
        id='CIUinput'
        ref={filepickerRef}
        onChange={(e) => addImageToPost(e)}
        type='file'
        name='bookImage'
        hidden
      />

      {Image && (
        <div>
          <img
            className='CIUimage'
            onClick={() => filepickerRef.current.click()}
            height={150}
            width={150}
            src={
              typeof Image === "string"
                ? `http://localhost:3900/${Image}`
                : typeof (Image === "object")
                ? URL.createObjectURL(Image)
                : ""
            }
            alt='Imag'
          />
          <p onClick={() => removeImage()}>Remove</p>
        </div>
      )}

      {!Image && (
        <div>
          <img
            className='CIUimage'
            onClick={() => filepickerRef.current.click()}
            height={150}
            width={150}
            src='https://i.picsum.photos/id/1032/150/150.jpg?hmac=DIbf0xC_HJchjLmN2loyEXyeaXfce8QqT9nqc4vF4PU'
            alt=''
          />

          <p onClick={() => filepickerRef.current.click()}>Select Image</p>
        </div>
      )}
    </div>
  );
}

export default InputBox;
