import React, { useRef } from "react";

function InputBox({ bookImage, addImageToPost, removeImage }) {
  //   const [imageToPost, setImageToPost] = useState(null);
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
      {bookImage && (
        <div>
          <img
            height={150}
            width={150}
            src={URL.createObjectURL(bookImage)}
            alt=''
          />
          <p onClick={() => removeImage()}>Remove</p>
        </div>
      )}
      {!bookImage && (
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
