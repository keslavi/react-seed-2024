import * as yup from 'yup';
import r from './regex';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
/*
README  
add extended, named custom functions to yup.string

copy/paste this for each new method to add. 
suggest keeping newest on top instead of bottom

*/
const val={i:0};

/*
  Date validation method that ensures:
  - max date is less than present date (or custom max date)
  - min date is greater than present -100 years (or custom min date)
  Parameters:
  - min: minimum allowed date (defaults to 100 years ago)
  - max: maximum allowed date (defaults to present date)
  - message: custom error message
*/
yup.addMethod(yup.date, "validDateRange", function(min = null, max = null, message = "Date must be within valid range") {
  const maxDate = max || dayjs();
  const minDate = min || dayjs().subtract(100, 'year');
  
  return this
    .max(maxDate, `Date cannot be later than ${maxDate.format('MM/DD/YYYY')}`)
    .min(minDate, `Date cannot be earlier than ${minDate.format('MM/DD/YYYY')}`)
    // .test(
    //   "valid-date-range",
    //   message,
    //   (value) => {
    //     if (!value) return true; // Let required validation handle empty values
    //     const date = dayjs(value);
    //     return date.isBefore(maxDate) && date.isAfter(minDate);
    //   }
    // );
});

yup.addMethod(yup.string,"isTemplate",function(){
  return this
  //.min(3,'too') //we can do several layers of yup validation, including custom
  .test(
    "subject-custom",
    "custom function error message",
    (value)=>{
      //we can do whatever here to validate
      return false;
    }
  )  
})

yup.addMethod(yup.string,"required",function(message){
  return this
  .test(
    "subject-custom",
    message,
    (value)=> window.isDraft!==true ? !isEmpty(value) : true
  )  
})

/*
  trim and remove all non printable characters.
  this doesn't change the FIELD, it changes submit KVP
*/
yup.addMethod(yup.string, "trim2",function(){
  return this
    .trim()
    .transform(value=>value.replace(/[^ -~]+/g, "*"))
})

yup.addMethod(yup.string,"isCurrency",function(){
  return this
    .required()
    .matches(r.currency.pattern,r.currency.message)
})

export default yup;


