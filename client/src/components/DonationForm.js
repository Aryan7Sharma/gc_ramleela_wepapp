import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoadingOverlay } from './index';
import { CustomPostApi } from "../helper/helper";
import CustomFormikInput from "../hooks/customFormikInput.hook";
import { toast } from "react-hot-toast";
const DonationForm = ({ initialValues, validationSchema, formikInput, formTitle, handleSubmit, lastStoredDonationFormDetails }) => {
  const [isloading, setIsloading] = useState(false);
  const [paymentType, setPaymentType] = useState("Cash");
  const [societyName, setSocietyName] = useState("Select");
  const [donationType, setdonationType] = useState("normal");

  const handlePaymentTypeChange = (payment_type, values) => {
    try {
      values.reference_no = payment_type === "0" ? "NA" : "";
      values.payment_type = payment_type;
      setPaymentType(payment_type);
    } catch (error) {
    }

  }

  const handleSocietyTypeChange = (society_name, values) => {
    try {
      values.society_name = society_name;
      setSocietyName(society_name);
    } catch (error) {
    }

  }

  const handleDonationTypeChange = (donation_type, values) => {
    try {
      values.donation_type = donation_type;
      if (donation_type === "normal") {
        values.name = '';
        values.email_id = '';
        values.phone_no = '';
        values.flat_no = '';
        values.block_no = lastStoredDonationFormDetails?.block_no || '';
        values.society_name = lastStoredDonationFormDetails?.society_name || '';
        values.city_name = lastStoredDonationFormDetails?.city_name || '';
        values.pan_no = '';
        values.payment_type = '0';
      } else {
        values.name = 'NA';
        values.email_id = 'NA@gamil.com';
        values.phone_no = '1234567891';
        values.flat_no = 'NA';
        values.block_no = 'NA';
        values.society_name = 'NA';
        values.city_name = 'NA';
        values.pan_no = 'NA';
        values.payment_type = '0';
        values.reference_no = 'NA';
      }
    } catch (error) {
    } finally {
      setdonationType(donation_type);
    }

  }

  const checkDonorExistence = async (values) => {
    try {
      setIsloading(true);
      if (!values?.phone_no) {
        toast.error('Phone Number is Requires')
        return null
      }
      const response = await CustomPostApi('collector/donorDetail', { phone_no: values.phone_no });
      if (response.status === 200) {
        toast.success("Donar Details Founded Successfully");
        const data = response.data?.donor_detail;
        values.name = data.name;
        values.email_id = data.email_id;
        values.flat_no = data.flat_no;
        values.block_no = data.block_no;
        values.society_name = data.society_name;
        values.city_name = data.city_name;
        values.pan_no = data.pan_no;
        values.collected_ammount = 0;
      } else if (response.status === 500) {
        toast.error("Something went wrong Please Contact Your Admin or Developer");
      } else if (response.error) {
        toast.error(response.error)
      } else {
      }

    } catch (error) {
      return null; // Handle errors gracefully
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, isSubmitting, status }) => (
        <Form className="w-full max-w-sm p-6 bg-white rounded shadow-md mx-auto  my-20 sm:max-w-lg ">
          {formTitle && <h2 className="flex items-center justify-center">{formTitle}</h2>}
          <hr className="mb-10"></hr>
          <div className="mb-4" style={{ display: values.donation_type === "secret" ? "none" : "block" }}>
            <label htmlFor="phone_no" className="block mb-1 font-medium">
              Phone No:
            </label>
            <div className="flex items-center">
              <Field
                type="text"
                id="phone_no"
                name="phone_no"
                placeholder={"Enter Phone No Here"}
                className="w-full p-2 border rounded"
                dispaly={true}
              />
              <button
                type="button"
                className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={() => checkDonorExistence(values)}
              >
                Check
              </button>
            </div>
            <ErrorMessage name="phone_no" component="div" className="text-maroon text-xl" />
          </div>
          <div className="">
            <label className="block font-semibold mb-1">Donation Type</label>
            <label className="inline-flex items-center space-x-2 mr-2">
              <Field type="radio" name="donation_type" value="normal" className="form-radio text-blue-500"
                //cheked={donationType==="normal"}
                onChange={() => handleDonationTypeChange("normal", values)}
              />
              <span>Normal</span>
            </label>
            <label className="inline-flex items-center space-x-2 ml-2">
              <Field type="radio" name="donation_type" value="secret" className="form-radio text-pink-500"
                //cheked={donationType==="secret"}
                onChange={() => handleDonationTypeChange("secret", values)}
              />
              <span>Seceret</span>
            </label>
          </div>
          {formikInput.map((item, i) => (
            <CustomFormikInput
              key={i}
              label={item.label + ":"}
              name={item.name}
              type={item.type}
              placeholder={"Enter " + item.label + " Here"}
            />
          ))}
          <div className="mb-4">
            <label htmlFor="payment_type" className="block mb-1 font-medium">
              Payment Type
            </label>
            <Field
              as="select"
              id="payment_type"
              name="payment_type"
              className="w-full p-2 border rounded"
              value={paymentType}
              onChange={(e) => handlePaymentTypeChange(e.target.value, values)}
            >
              <option value="0">Cash</option>
              <option value="1">Cheque</option>
              <option value="2">Paytm</option>
              <option value="3">Phone_pay</option>
              <option value="4">Google_pay</option>
              <option value="5">Other</option>
            </Field>
            <ErrorMessage name="payment_type" component="div" className="text-maroon text-xl" />
          </div>
          <div className="mb-4">
            <label htmlFor="society_name" className="block mb-1 font-medium">
              Society Name 
            </label>
            <Field
              as="select"
              id="society_name"
              name="society_name"
              className="w-full p-2 border rounded"
              value={societyName}
              onChange={(e) => handleSocietyTypeChange(e.target.value, values)}
            >
              <option value="1st Avenue">1st Avenue</option>
              <option value="4th Avenue">4th Avenue</option>
              <option value="5th Avenue">5th Avenue</option>
              <option value="6th Avenue">6th Avenue</option>
              <option value="7th Avenue">7th Avenue</option>
              <option value="10th Avenue">10th Avenue</option>
              <option value="11th Avenue">11th Avenue</option>
              <option value="12th Avenue">12th Avenue</option>
              <option value="14th Avenue">14th Avenue</option>
              <option value="16th Avenue">16th Avenue</option>
              <option value="Saya Zion<">Saya Zion</option>
              <option value="Park Avenuue">Park Avenue</option>
              <option value="North Avenue 1">North Avenue 1</option>
              <option value="Others">Others</option>
            </Field>
            <ErrorMessage name="society_name" component="div" className="text-maroon text-xl" />
          </div>
          {(status || isloading) && (
            <LoadingOverlay />
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};


export default DonationForm;
