import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';
import { updateSubscription } from 'routes/admin/Users/Client/modules/subscriptions';
import { UpdateSubscriptionForm } from 'components/Forms/Subscription';

const SubscriptionEditModal = props => {
  const _onSubmit = data => {
    props.hideModal()
    props.dispatch(updateSubscription(data))
  }
  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Edit Subscription' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateSubscriptionForm
          initialValues={props.initialValues}
          cards={props.cards}
          _onSubmit={_onSubmit}

        />
      </Modal.Body>
    </Modal>
  );
}

export default connect()(SubscriptionEditModal);

