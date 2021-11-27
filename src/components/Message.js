import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({ message, info, positive, warning, negative }) => {
    return (
        <Message info positive warning negative>
            {message}
        </Message>
  )
};
