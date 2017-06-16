import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Loading from 'react-loading';

import fields from 'consts/data/formFields';
import { checkValidation } from 'utils/formHelpers';
import {
  FormGroup,
  FormControl
} from 'components';
import classes from './payment.scss';

const formFields = [ 'ccFirstName', 'ccLastName', 'creditCardNumber', 'expirationDate', 'cvCode' ]
const paymentFormFields = _.pick(fields, formFields)
//const fields = {
  //first_name: {
    //name: 'first_name',
    //type: 'text',
    //label: 'First name',
  //},
  //last_name: {
    //name: 'last_name',
    //type: 'text',
    //label: 'Last name',
  //},
  //creditCardNumber: {
    //name: 'creditCardNumber',
    //type: 'text',
    //label: 'Valid card number',
    //normalize: normalizeCreditCard
  //},
  //expirationDate: {
    //name: 'expirationDate',
    //type: 'text',
    //label: 'Expiration date',
    //normalize: normalizeExDate
  //},
  //cvCode: {
    //name: 'cvCode',
    //type: 'text',
    //label: 'CVC',
    //maxLength: '4',
    //normalize: normalizeNums
  //}
//}

const validate = values => {
  return checkValidation(values, fields)
}
const renderInput = (props) => {
  const {
    input,
    label,
    placeHolder,
    type,
    maxLength,
    meta: { touched, error, warning }
  } = props

  let message = touched &&
    (
      error && <span className='text-danger'>
        <strong>
          Opps!
        </strong>
      {error}
    </span>
    )
  let validationState = touched && ( error && 'error') || null

  return (
      <FormGroup validationState={validationState}>
        <label>
          {label}
        </label>
      <FormControl {...input}
        placeholder={placeHolder}
        maxLength={maxLength}
        type={type} />
      {message}
      </FormGroup>
  )
}


const renderField = () => {
  const fieldKeys = Object.keys(paymentFormFields)
  return fieldKeys.map(function(key, i) {
    const { name, type, placeHolder, label, maxLength, normalize } = fields[key]
    return (
      <Field
        key={i}
        name={name}
        type={type}
        maxLength={maxLength}
        component={renderInput}
        label={label}
        normalize={normalize}
      />
    )
  })
}


const renderErrorMessage = (error) => (
  <p className="alert-danger">
    {error}
  </p>
)

let PaymentForm = (props) => {
  const {
    submitForm,
    errorMessage,
    planType,
    price,
    handleSubmit,
    invalid,
    submitting,
    isFetching
  } = props

  const buttonLabel = (
    isFetching ?
      "Submitting Subscription..."
        :
          "Start Subscription"
  )

 return(
    <form onSubmit={handleSubmit(submitForm)}>
      {renderField()}
      <p>
        All major credit cards are accepted through a secure payment process
      </p>
      <button className="full-width btn btn-success"
        disabled={invalid || submitting}
        action="submit">
          { buttonLabel }
      </button>
    </form>
  )
}

PaymentForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

PaymentForm = reduxForm({
  form: 'payment',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(PaymentForm);

export default PaymentForm;
