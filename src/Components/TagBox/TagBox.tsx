import React from 'react';
import { Badge } from 'react-bootstrap';
import './TagBox.css';

function TagBox(props: any) {
  const { tags } = props;

  interface Tag {
    id: number;
    tagname: string;
  }

  return (
    <div className='tagbox mb-2'>
      {tags.map((x: Tag) => (
        <Badge key={x.id} variant='success' className='m-1 tag'>
          {x.tagname}
        </Badge>
      ))}
    </div>
  );
}

export default TagBox;
