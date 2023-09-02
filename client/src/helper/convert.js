// const fs = require('fs');
/** image onto base64 */
export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}


export function convertPdfFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }

        if (file.type === 'application/pdf') {
            // Handle PDF file
            fileReader.readAsArrayBuffer(file);
        } else {
            // Handle image file
            fileReader.readAsDataURL(file);
        }
    });
}


export const fetchPdfTemplate = async () => {
    try {
        const response = await fetch('/test1.pdf'); // Update the path accordingly
        if (!response.ok) {
            throw new Error('Failed to fetch PDF template');
        }
        console.log("responece", response);
        const pdfBytes = await response.arrayBuffer();
        console.log("pdfbytes",pdfBytes);
        return pdfBytes;
    } catch (error) {
        console.error('Error fetching PDF template:', error);
        throw error;
    }
};

//fetchPdfTemplate().then((resp)=>console.log(resp)).catch((error)=>console.log("error",error));

//   export const fetchPdfTemplate = async () => {
//     try {

//         const pathArray = __dirname.split("/");
//         pathArray.pop();
//         const pdfTemplatePath = pathArray.join("/")+"/assets/Sample_RECEIPTBOOK_final.pdf";
//         const pdfBytes = await fs.promises.readFile(pdfTemplatePath);
//         return pdfBytes;
//     } catch (error) {
//       console.error('Error fetching PDF template:', error);
//       throw error;
//     }
//   };    


