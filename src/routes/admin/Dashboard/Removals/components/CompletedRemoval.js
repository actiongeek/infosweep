import React, { Component, PropTypes } from 'react';
import { formatDate } from 'utils/dateHelper';

import { DropdownButton, MenuItem, Button, Label } from 'components';

const CompletedRemoval = ({ removal }) => {
  const {
    id,
    removed_url,
    client_name,
    completed_at
  } = removal

  const truncatedUrl = removed_url ? removed_url.substring(0, 100) : ''

  return (
    <tr className='bg-gray-darker' key={id}>
      <td>
        { id }
      </td>
      <td>
        { client_name }
      </td>
      <td className='text-white'>
        <a href={removed_url} target='_blank'>
          { truncatedUrl }
        </a>
      </td>
      <td>
        { formatDate(completed_at) }
      </td>
    </tr>
  )
}

CompletedRemoval.propTypes = {
  removal: PropTypes.object,
}

export default CompletedRemoval;

