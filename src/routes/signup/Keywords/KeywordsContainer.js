import PropTypes from 'prop-types';
import React, { Component } from 'react'

import { RoutedComponent, connect } from 'routes/routedComponent'
import {
  postKeywords,
  CREATE_KEYWORD_SUCCESS,
  KEYWORD_FAILURE
} from 'routes/client/Account/modules/keywords'
import Keywords from './components/Keywords'
import { persistData as persistDataToLocalStorage } from 'localStorage'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'


class KeywordContainer extends RoutedComponent {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.buildParams = this.buildParams.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
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

  buildParams (values) {
    return {
      address: values.address,
      zip: values.zipcode,
      city: values.city,
      state: values.state.value,
      country: 'US',
      dob: values.dob,
      phone: values.phoneNumber,
      phone_type: 'mobile',
      account: this.props.currentUser.account_id
    }
  }

  submitForm (formProps) {
    let params = this.buildParams(formProps)
    this.props.postKeywords(params)
    .then(res => { this.onNext(res) })
    .catch(error => { console.log('error in keywords', error) })
  }

  onNext (res) {
    switch (res.type) {
      case CREATE_KEYWORD_SUCCESS:
        persistDataToLocalStorage(true, 'isLoggedIn')
        this.context.router.push('/dashboard')
      break
    default:
      this.props.router.push('/keywords')
    }
  }

  render () {
    return (
      <Keywords
        submitForm={this.submitForm}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    keywords: state.account.keywords.all
  }
}

const mapActionCreators = {
  postKeywords
}

export default connect(mapStateToProps, mapActionCreators)(KeywordContainer)
