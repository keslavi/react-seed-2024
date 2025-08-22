import {
  yup,
  yupResolver,
  //regex,
} from '@/helpers/form-validation';

//export { yup };
export * from '@/helpers/form-validation/errorNotification';

export const schema= yup.object().shape({
  id:yup.string().required("id is required"),
  subject: yup.string().required("please provide a subject"),
  body: yup.string().required("please provide a body"),
  dfrom: yup.date()
    .validDateRange() //(min, max)
    .required("From date is required"),
  address: yup.object().shape({
    line1:yup.string().required("address line 1 required"),
    line2:yup.string().required("address line 2 required"),
    line3:yup.string().required("address line 3 required"),
  })
})

export const resolver=yupResolver(schema);
