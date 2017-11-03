import React from 'react'
import Signup from './components/Signup'
import ReactGA from 'react-ga'

import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import { persistData } from 'localStorage'
import { postPayment, PAYMENT_SUCCESS, deletePaymentErrorMessage } from 'routes/signup/Payment/modules/payment'
import { showModal, hideModal } from 'modules/modal'
import {
  postUserSignup,
  removeErrorMessage,
  USER_SIGNUP_SUCCESS
} from 'routes/auth/modules/auth'
import RootModal from 'components/Modals'

const persistDataToLocalStorage = data => {
  const { auth_token } = data

  persistData(auth_token, 'authToken')
}

class SignupContainer extends RoutedComponent {
  constructor (props) {
    super(props)
    this.state = {disableButton: true}

    this.submitForm = this.submitForm.bind(this)
    this.submitPaymentForm = this.submitPaymentForm.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.doNext = this.doNext.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions () {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  componentWillReceiveProps (nextProps) {
    nextProps.currentUser.role === 'prospect' &&
      this.props.showModal('PAYMENT_FORM')
  }

  componentWillUnmount () {
    this.props.hideModal()
  }

  buildParams (user) {
    return {
      user: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        password: user.password,
        phone_type: 'mobile',
        plan: 'individual'
      }
    }
  }

  buildPaymentParams (values) {
    return {
      user: this.props.currentUser.id,
      card_holder_name: values.fullName,
      card_number: this.sanitizeNums(values.creditCardNumber),
      card_month: values.expirationMonth.value,
      card_year: values.expirationYear.value,
      card_cvc: values.cvCode,
      address: values.address,
      city: values.city,
      state: values.state.value,
      zip: values.zipcode,
      plan: 'individual'
    }
  }

  sanitizeNums (value) {
    return value.replace(/[^\d]/gi, '')
  }

  toLowerCase (name) {
    return name.toLowerCase()
  }

  submitForm (user) {
    if (user.password !== user.passwordConfirmation) {
      this.setState({passwordErrorMsg: 'Passwords Do Not Match'})
    } else {
      this.setState({passwordErrorMsg: null})
      const payload = this.buildParams(user)
      this.props.postUserSignup(payload)
        .then(res => { this.doNext(res) })
        .catch(error => { console.log('error user signup', error) })
    }
  }

  submitPaymentForm (formProps) {
    this.props.deletePaymentErrorMessage()
    let params = this.buildPaymentParams(formProps)
    this.props.postPayment(params)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error payment', error) })
  }

  handleClick () {
    this.context.router.push('/keywords')
  }

  doNext (res) {
    switch (res.type) {
    case USER_SIGNUP_SUCCESS:
      persistDataToLocalStorage(res.data)
      this.props.removeErrorMessage()
      ReactGA.ga('send', 'event', 'Form Interaction', 'Subscribe', 'Individual 39', 39)
      break
    case PAYMENT_SUCCESS:
      this.props.hideModal()
      this.props.showModal('PAYMENT_SUCCESS')
      break
    default:
      return null
    }
  }

  render () {
    return (
      <div>
        <Signup
          submitForm={this.submitForm}
          errorMessage={this.props.currentUser.errorMessage}
          passwordErrorMsg={this.state.passwordErrorMsg}
          showModal={this.props.showModal}
        />
        <RootModal
          submitForm={this.submitPaymentForm}
          errorMessage={this.props.payment.errorMessage}
          paymentSuccess={this.props.payment.success}
          isFetching={this.props.payment.isFetching}
          planType='Individual'
          planPrice='39'
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  payment: state.payment,
  form: state.form
})

const mapActionCreators = {
  postUserSignup,
  removeErrorMessage,
  postPayment,
  deletePaymentErrorMessage,
  showModal,
  hideModal
}

export default connect(mapStateToProps, mapActionCreators)(SignupContainer)