import React from "react";

function UpVotes(props: any) {
  const { upVotes } = props;

  const increment = () => {
    console.log("+");
  };

  return (
    <div className="UpVotes">
      <div>
        <i onClick={increment} className="las la-thumbs-up">
          {upVotes}
        </i>
      </div>
    </div>
  );
}

export default UpVotes;
