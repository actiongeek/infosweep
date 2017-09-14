import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'modules/modal';
import {
  UserModal,
  AccountModal,
  TransactionModal,
  KeywordModal,
  CreateAddressModal,
  UpdateAddressModal,
  ProfileModal,
  PhoneModal,
  UpdateSubscriptionModal,
  CreateSubscriptionModal,
  CardModal,
  RemovalInstructionsModal,
  PaymentFormModal,
  PaymentSuccessModal,
  TermsOfServiceModal,
  PrivacyPolicyModal,
  CancelSubscriptionModal,
  CanceledSubscriptionModal,
  AdminModal
} from './components'

const MODAL_COMPONENTS = {
  'USER':                  UserModal,
  'ADMIN_UPDATE':          AdminModal,
  'ACCOUNT':               AccountModal,
  'TRANSACTION':           TransactionModal,
  'KEYWORD':               KeywordModal,
  'UPDATE_ADDRESS':        UpdateAddressModal,
  'CREATE_ADDRESS':        CreateAddressModal,
  'PHONE':                 PhoneModal,
  'PROFILE':               ProfileModal,
  'UPDATE_SUBSCRIPTION':   UpdateSubscriptionModal,
  'CREATE_SUBSCRIPTION':   CreateSubscriptionModal,
  'CARD':                  CardModal,
  'REMOVAL_INSTRUCTIONS':  RemovalInstructionsModal,
  'PAYMENT_FORM':          PaymentFormModal,
  'PAYMENT_SUCCESS':       PaymentSuccessModal,
  'TOS':                   TermsOfServiceModal,
  'PRIVACY_POLICY':        PrivacyPolicyModal,
  'CANCEL_SUBSCRIPTION':   CancelSubscriptionModal,
  'CANCELED_SUBSCRIPTION': CanceledSubscriptionModal,
  'REMOVAL_INSTRUCTIONS':  RemovalInstructionsModal
}

const ModalRoot = ({...otherProps, modalType, modalProps, dispatch }) => {
  if(!modalType) {
    return <span />
  }

  const _hideModal = () => {
    dispatch(hideModal())
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal
    initialValues={modalProps}
    hideModal={_hideModal}
    {...otherProps}
    />
}

export default connect(
  state => state.modal
)(ModalRoot)
