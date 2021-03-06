import React from 'react'
import PropTypes from 'prop-types'

import {
  Panel,
  Table,
  Button,
  ScrollBarContainer
} from 'components'

import Subscription from 'routes/admin/Subscriptions/components/Subscription'


const Subscriptions = ({subscriptions, showModal, handleNewSubscription}) => {
  const handleUpdate = subscription => {
    showModal('UPDATE_SUBSCRIPTION', subscription)
  }

  const handleCharge = subscription => {
    showModal('CHARGE_SUBSCRIPTION', {subscription_id: subscription.id})
  }

  const buttons = [
    {
      label: <i className="fa fa-pencil"> Edit</i>,
      style: 'link',
      onClick: handleUpdate
    },
    {
      label: "Charge",
      style: 'danger',
      onClick: handleCharge
    }
  ]

  return (
      <div>
        <Button
          onClick={handleNewSubscription}
          className='pull-right m-t-1 m-r-1'
          bsSize='small'
          bsStyle='success'
        >
          Create Subscription <i className='fa fa-plus'></i>
        </Button>
        <Panel
          header={
            <h4 className='panel-title'>
              Subscriptions
            </h4>
          }
        >
          <ScrollBarContainer
            noXScrollBar
            style={{
              maxHeight: '200px'
            }}
          >
          <Table responsive>
            <thead>
              <tr>
                <th>
                  id
                </th>
                <th>
                  client name
                </th>
                <th>
                  user id
                </th>
                <th>
                  start date
                </th>
                <th>
                  end date
                </th>
                <th>
                  plan id
                </th>
                <th>
                  plan description
                </th>
                <th>
                  sales rep
                </th>
                <th>
                  card id
                </th>
                <th>
                  account status
                </th>
                <th>
                  next payment
                </th>
                <th>
                </th>
              </tr>
            </thead>
            {
              subscriptions.map(subscription => {
                return <Subscription
                  subscription={subscription}
                  key={subscription.id}
                  buttons={buttons}
                  handleClick={handleUpdate}
                />
              })
            }
          </Table>
          </ScrollBarContainer>
        </Panel>
      </div>

  )
}

Subscriptions.propTypes = {
  subscriptions: PropTypes.array,
  showModal: PropTypes.func,
  handleNewSubscription: PropTypes.func
}

export default Subscriptions

