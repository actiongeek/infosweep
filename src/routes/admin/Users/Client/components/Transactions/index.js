import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Table, ScrollBarContainer } from 'components'
import Transaction from 'routes/admin/Transactions/components/Transaction'

const Transactions = ({ transactions, showModal }) => {
  return (
    <Panel
      header={
        <h4 className='panel-title'>
          Transactions
        </h4>
      }
    >
      <ScrollBarContainer
        noXScrollBar
        style={{
          maxHeight: '400px'
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
                client email
              </th>
              <th>
                third party id
              </th>
              <th>
                process date
              </th>
              <th>
                # of rounds
              </th>
              <th>
                subscription id
              </th>
              <th>
                type of deal
              </th>
              <th>
                sales rep
              </th>
              <th>
                Status
              </th>
              <th>
                Amount
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          {
            transactions.map(transaction => {
              return <Transaction
                transaction={transaction}
                showModal={showModal}
                key={transaction.id}
              />
            })
          }
        </Table>
        <div className='m-t-3'></div>
      </ScrollBarContainer>
    </Panel>
  )
}

Transactions.propTypes = {
  transactions: PropTypes.array,
  showModal: PropTypes.func
}

export default Transactions
