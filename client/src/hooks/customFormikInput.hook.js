import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import PropTypes from "prop-types";

const CustomFormikInput = ({ label, name, style, disabled, ...rest }) => {
    const [field, meta] = useField(name);

    return (
        <div className="mb-4">
            {label?<label htmlFor={name} className="block mb-1 font-medium">
                {label}
            </label>:null}
            <Field
                id={name}
                name={name}
                rows="4"
                {...field}
                {...rest}
                disabled = {disabled?true:false}
                className={style ? "w-full p-2 border rounded " + style : "w-full p-2 border rounded"}
            />
            <ErrorMessage name={name} component="div" className="text-maroon text-xl" />
        </div>
    );
};

CustomFormikInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};


export default CustomFormikInput;
