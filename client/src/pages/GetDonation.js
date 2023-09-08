import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { validatingForm } from '../helper/validate';
import { CustomPostApi } from '../helper/helper';
// import Component's
import { Navbar, DonationForm, Footer, GenerateDonationReceiptPdf } from '../components/index';
const GetDonationForm = () => {
  const [showPdfOverlay, setShowPdfOverlay] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [getReceiptDetails, setGetReceiptDetails] = useState(null);
  // Retrieving the dictionary from LocalStorage
  const storedDictionaryString = localStorage.getItem('lastdonationFormDetails');
  const lastStoredDonationFormDetails = JSON.parse(storedDictionaryString);
  // set donation form details
  const [donationDeatils, setDonationDetails] = useState({
    name: '',
    email_id: 'NA',
    phone_no: '',
    flat_no: '',
    block_no: lastStoredDonationFormDetails?.block_no || '',
    society_name: lastStoredDonationFormDetails?.society_name || '',
    city_name: lastStoredDonationFormDetails?.city_name || '',
    pan_no: '',
    payment_type: '0', // Default to 'Cash'
    reference_no: 'NA',
    collected_ammount: '',
    donation_type: 'normal' // Default to 'Normal'
  });
  const validationSchema = validatingForm("name", "email_id", "phone_no", "flat_no", "block_no", "society_name", "city_name", "payment_type", "reference_no", "donation_type", "collected_ammount", "pan_no")
  const formTitle = "Donation Form";
  const formikInput = [
    { "label": "Name", "name": "name", "type": "text" },
    { "label": "Email", "name": "email_id", "type": "email" },
    { "label": "Flat No", "name": "flat_no", "type": "text" },
    { "label": "Block No", "name": "block_no", "type": "text" },
    { "label": "Society Name", "name": "society_name", "type": "text" },
    { "label": "City Name", "name": "city_name", "type": "text" },
    { "label": "Pan No", "name": "pan_no", "type": "string" },
    { "label": "Amount", "name": "collected_ammount", "type": "string" },
    { "label": "Reference No", "name": "reference_no", "type": "text" },
  ]


  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      actions.setStatus(true); // Set loading status
      const donationData = values;
      setGetReceiptDetails(null);
      // Storing a dictionary in LocalStorage
      let responce = ""
      if (values.donation_type === "normal") {
        const dictionaryString = JSON.stringify(donationData);
        localStorage.setItem('lastdonationFormDetails', dictionaryString);
        responce = await CustomPostApi('collector/donationcollection', donationData);
      } else {
        responce = await CustomPostApi('collector/donationcollectionforguest', donationData);
      }
      if (responce.error) {
        toast.error("Donnaction Collection Failed!")
        //toast.error(responce.error)
      } else if (responce.status === 200) {
        toast.success("Donnaction Collected Successfully!")
        toast.success(responce.data?.msg || '');
        const data = responce.data?.data[0]
        actions.setStatus(false)
        setShowPdfOverlay(true)
        setGetReceiptDetails(data);
      } else {
        toast.error("Something went wrong, try again or contact your admin.")

      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      actions.resetForm();
      actions.setStatus(false); // Set loading status
      actions.setSubmitting(false);
    }
  }
  return (
    <main>
      <Navbar />
      {/* Overlay with GeneratePdf component */}
      {getReceiptDetails && <GenerateDonationReceiptPdf pdfData={pdfData} setPdfData={setPdfData} getReceiptDetails={getReceiptDetails} showPdfOverlay={showPdfOverlay} setShowPdfOverlay={setShowPdfOverlay} />} {/* Pass the PDF data as a prop */}
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {/* <ResponsiveForm /> */}
      <DonationForm
        initialValues={donationDeatils}
        validationSchema={validationSchema}
        formikInput={formikInput}
        formTitle={formTitle}
        handleSubmit={handleSubmit}
        lastStoredDonationFormDetails={lastStoredDonationFormDetails} />
      <Footer />
    </main>
  )
}

export default GetDonationForm
