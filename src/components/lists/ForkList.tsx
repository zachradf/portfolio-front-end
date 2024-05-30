import React from 'react';
import ForkListItem from './ForkListItem';

interface ForkItem {
  id: string;
  title: string;
  body: string;
  //   labels: string[];
  owner: { login: string };
  created_at: string;
}

type ListProps = {
  items: ForkItem[];
};

const ForkList: React.FC<ListProps> = ({ items }) => {
  return (
    <div className="list">
      {items.map((item) => (
        <ForkListItem
          key={item.id}
          title={item.title}
          body={item.body}
          //   labels={item.labels}
          owner={item.owner.login}
          created_at={item.created_at}
        />
      ))}
    </div>
  );
};

export default ForkList;
