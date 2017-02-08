import React, { PropTypes } from 'react';
import { FormattedHTMLMessage } from 'react-intl';

const Comment = (props) => {
  const { name, body, email } = props;
  return (
    <article>
      <div>
        <FormattedHTMLMessage
          id="comment.meta.author"
          values={{
            email,
            name,
          }}
        />
      </div>

      <p>
        {body}
      </p>
    </article>
  );
};

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Comment;
