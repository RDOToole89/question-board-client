import React from "react";

function UpVotes(props: any) {
  const { upVotes } = props;

  return (
    <div className="UpVotes">
      <div>
        <i className="las la-thumbs-up">{upVotes}</i>
      </div>
    </div>
  );
}

export default UpVotes;
