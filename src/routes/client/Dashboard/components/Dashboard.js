import React, { PropTypes } from 'react';
import { compose } from 'recompose';

import SpinnerWhileLoading from 'HOC/SpinnerWhileLoading';
import hideIfNoData from 'HOC/hideIfNoData';
import KeywordSummary from './KeywordSummary';
import PrivacyRemovalBarChart from './BarChart';
import PrivacyRemovalPieChart from './PieChart';
import CompletedRequests from 'routes/client/Monitoring/components/CompletedRequests';
import ClientDetails from './ClientDetails';
import GoogleResults from './GoogleResults';
import getFullName from 'utils/fullName';
import capitalize from 'utils/capitalize';
import { Row, Col, Panel, PageHeader } from 'components';
import { Colors } from 'consts';
import classes from './dashboard.scss';

const enhancer1 = SpinnerWhileLoading(
  props => props.isFetching
)

const enhancer2 = hideIfNoData(
  props => !props.hasData
)

export const Dashboard = (props) => {
  const {
    user,
    chartData,
    pieData,
    completedRequests,
    googleResults,
    keywords,
    handleSearch,
    handlePrivacyRemovalButtonClick
  } = props

  const fullName = capitalize(getFullName(user))

  return (
    <div className={classes.mainWrap}>
      <div>
        <Row>
          <Col md={ 12 }>
            <div>
              <PageHeader>
                Welcome <small className='text-gray-lighter'>{fullName}</small>
              </PageHeader>
            </div>
          </Col>
        </Row>
        <KeywordSummary keywords={keywords.all} />
        <Row className={ classes.sectionRow }>
          <Col md={ 8 }>
            <PrivacyRemovalBarChart chartData={chartData} />
          </Col>
          <Col md={ 4 }>
            <PrivacyRemovalPieChart pieData={pieData} />
          </Col>
        </Row>
        <Row className={ classes.sectionRow }>
          <Col md={ 12 }>
            <CompletedRequests
              completed={completedRequests}
              title='Most Recent Removals'
            />
          </Col>
          <Col md={ 12 }>
            <GoogleResults
              results={googleResults}
              keywords={keywords}
              handleSearch={handleSearch}
              handlePrivacyRemovalButtonClick={handlePrivacyRemovalButtonClick}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  chartData: PropTypes.object,
  pieData: PropTypes.object,
  completedRequests: PropTypes.array,
  googleResults: PropTypes.array,
  keywords: PropTypes.array.isRequired,
  handleSearch: PropTypes.func,
  handlePrivacyRemovalButtonClick: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired
}

export default compose(enhancer1, enhancer2)(Dashboard);