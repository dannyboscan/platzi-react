import React from 'react';

const Comment = (props) => {
  const { name, body, email } = props;
  return (
    <article>
      <div>
        By: <a href="`mailto:${email}`">name</a>
      </div>

      <p>
        {body}
      </p>
    </article>
  );
};

export default Comment;
