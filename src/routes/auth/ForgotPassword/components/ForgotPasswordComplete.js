import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Row, Col, Panel } from 'components'
import classes from './forgotPassword.scss'
import logo from 'static/logos/logo-white-sm.png'

const ForgotPasswordComplete = ({ userEmail }) => {
  return (
    <Row>
      <Col lg={12}>
        <Row>
          <Col className={classes.centerCol} md={4}>
            <Panel
              header={(
                <Link to='/' className={classes.toHomeLink}>
                  <img src={logo} height={50} alt='Back to Home' />
                </Link>
              )}
              footer={(
                <div>
                  <Link to='/login'>
                    Login
                  </Link>
                </div>
              )}
            >
              <h2 className={classes.panelHeader}>
              </h2>
              <p className='text-center m-b-3'>
                An email to {userEmail} from InfoSweep has been sent.
                Please follow the instructions in the email to reset your password.
              </p>

            </Panel>
            <p className='text-center text-gray-light'>
              <span className="text-gray-dark">
                © 2017 <strong className="m-r-1">InfoSweep.</strong>
                All rights reserved.
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ForgotPasswordComplete.propTypes = {
  userEmail: PropTypes.string
}

export default ForgotPasswordComplete
