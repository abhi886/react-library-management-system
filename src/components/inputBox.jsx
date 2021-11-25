import React, { useRef } from "react";

function InputBox({ Image, addImageToPost, removeImage }) {
  const filepickerRef = useRef(null);
  return (
    <div>
      <div onClick={() => filepickerRef.current.click()}>
        <p className='mt-2'>UPLOAD IMAGE </p>
        <input
          ref={filepickerRef}
          onChange={(e) => addImageToPost(e)}
          type='file'
          name='bookImage'
          hidden
        />
      </div>
      {Image && (
        <>
          <div onClick={() => filepickerRef.current.click()}>
            <img
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
          </div>
          <p onClick={() => removeImage()}>Remove</p>
        </>
      )}
      {/* src={URL.createObjectURL(bookImage)} */}

      {!Image && (
        <div onClick={() => filepickerRef.current.click()}>
          <img
            height={150}
            width={150}
            src='https://i.picsum.photos/id/1032/150/150.jpg?hmac=DIbf0xC_HJchjLmN2loyEXyeaXfce8QqT9nqc4vF4PU'
            alt=''
          />
          {/* <p>Remove</p> */}
        </div>
      )}
    </div>
  );
}

export default InputBox;
