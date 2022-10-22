import Input from "../common/input";
// import Select from "../common/"
import Joi from "joi-browser";
import Dropdown from "components/common/dropdown";

function useForm(props) {
  const { schema, doSubmit, data, SetData, error, SetError } = props;

  const validation = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error?.details) {
      errors[item?.path[0]] = item?.message;
    }
    console.log(errors);
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const rule = { [name]: schema[name] };
    const { error } = Joi.validate(obj, rule);
    return error ? error.details[0].message : null;
  };

  const handleCheckBoxClick = ({ currentTarget: input }) => {
    const checked = data[input.name];
    console.log(checked);
    SetData({ ...data, [input.name]: !checked });
  };

  const changeHandler = ({ currentTarget: input }) => {
    console.log(input);
    const errorMessage = validateProperty(input);
    const errors = { ...error };
    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];
    SetError(errors);
    SetData({ ...data, [input.name]: input.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validation();
    SetError({ error: errors || {} });
    // if (error) return;
    doSubmit();
  };

  const renderButton = (label) => {
    return (
      <button
        disabled={validation() === null ? false : true}
        className='btn btn-primary'
        type='submit'
      >
        {label}
      </button>
    );
  };
  const renderDropdown = ({ name, label, options }) => {
    return (
      <Dropdown
        options={options}
        label={label}
        name={name}
        value={data[name]}
        onChange={changeHandler}
        error={error[name]}
      />
    );
  };
  const renderInput = ({ label, name, type = "text", focused = false }) => {
    return (
      <Input
        className='form-control'
        name={name}
        label={label}
        type={type}
        autoFocus={focused}
        value={data[name]}
        error={error[name]}
        onChange={changeHandler}
      />
    );
  };

  // const renderSelect = ({ label, name, options }) => {
  //   return (
  //     <Select
  //       name={name}
  //       value={data[name]}
  //       label={label}
  //       options={options}
  //       onChange={changeHandler}
  //       error={error[name]}
  //     />
  //   );
  // };

  const renderCheckbox = ({ label, name, type }) => {
    return (
      <div className='checkbox mb-3'>
        <label>
          <input
            type={type}
            value={data[name]}
            name={name}
            onClick={handleCheckBoxClick}
          />{" "}
          {label}
        </label>
      </div>
    );
  };

  return {
    submitHandler,
    renderButton,
    renderInput,
    renderCheckbox,
    // renderSelect
    renderDropdown,
  };
}

export default useForm;
