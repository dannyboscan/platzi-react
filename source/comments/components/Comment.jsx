import React, { PropTypes } from 'react';

const Comment = (props) => {
  const { name, body, email } = props;
  return (
    <article>
      <div>
        By: <a href={`mailto:${email}`}>{name}</a>
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
