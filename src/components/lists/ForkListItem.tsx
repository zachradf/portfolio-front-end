import React from 'react';

interface ListItemProps {
  title: string;
  body: string;
  //   labels: string[];
  owner: string;
  created_at: string;
}

const ForkListItem: React.FC<ListItemProps> = ({
  title,
  body,
  //   labels,
  owner,
  created_at,
}) => {
  return (
    <div className="list-item">
      <h3>{title}</h3>
      <p>{body}</p>
      {/* <div className="labels">
        {labels.map((label) => (
          <span key={label} className="label">
            {label}
          </span>
        ))}
      </div> */}
      <div className="list-item-footer">
        {owner} on {new Date(created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ForkListItem;
