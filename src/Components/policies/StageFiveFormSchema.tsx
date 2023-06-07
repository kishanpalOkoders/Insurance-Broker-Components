import * as Yup from 'yup';
// import { emptyStringToUndefined } from '../Common/EmptyStringToUndefined';

const StageFiveFormSchema = (isArabicLanguage: boolean) => {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
      ];
    const schema = {
        // tawuniya_quotation_recived: Yup.string().required(isArabicLanguage ? 'اسم العميل مطلوب' : "Please select quotation recived."),
        // tawuniya_quotation_recived: Yup.boolean().required().oneOf([0 , 1], 'Selecting the quotation field is required'),
        // tawuniya_quotation_recived: Yup.string().required()

        // .min(1, !isArabicLanguage ? "Customer name is too short" : "اسم العميل قصير جدا")
        // .max(20, !isArabicLanguage ? "Customer name is too Long" : "اسم العميل طويل جدًا")
        // .matches(/^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/, isArabicLanguage ? 'يجب ألا يحتوي هذا الحقل على مسافة بيضاء أو أحرف خاصة أو أرقام' : 'This field should not contain white space, special character or digits')

        quotation_amount: Yup.string().required(isArabicLanguage ? 'الحالة مطلوبة' : "Quotation Amount is required."),
        proposal: Yup.string().required(),
        comment: Yup.string()
            .min(4, !isArabicLanguage ? "Comment is too short" : "اسم العميل قصير جدا")
            .max(250, !isArabicLanguage ? "Comment is too Long" : "اسم العميل طويل جدًا").required(isArabicLanguage ? 'الحالة مطلوبة' : "Comment is required."),
            note_to_the_customer: Yup.string()
            .min(4, !isArabicLanguage ? "Comment is too short" : "اسم العميل قصير جدا")
            .max(250, !isArabicLanguage ? "Comment is too Long" : "اسم العميل طويل جدًا").required(isArabicLanguage ? 'الحالة مطلوبة' : "Comment is required."),
            additional_attachment: Yup.mixed().required('File is required').test(
            "fileSize",
            "File too large",
            (value:any) =>  value && value?.size <= FILE_SIZE
          )
          .test(
            "fileFormat",
            "Unsupported Format",
            (value:any) => value && SUPPORTED_FORMATS.includes(value?.type)
          ),
        // .test("FILE_SIZE", "Uploaded file is too big.",  (value:any) => !value || (value && value?.size <= 10)).test("FILE_FORMAT", "Uploaded file has unsupported format.", value => !value), // || (value && SUPPORTED_FORMATS.includes(value.type))
        release_quotation_to_customer: Yup.string().required(isArabicLanguage ? 'اسم العميل مطلوب' : "Please select release quotation to customer."),
    }
    return schema;
}

export default StageFiveFormSchema;