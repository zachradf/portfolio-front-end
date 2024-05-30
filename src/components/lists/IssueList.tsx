// import React from 'react';
// import ListItem from './ListItem';

// interface UserItem {
//   id: string;
//   title: string;
//   body: string;
//   labels: string[];
//   user: { login: string };
//   created_at: string;
// }

// interface OwnerItem {
//   id: string;
//   title: string;
//   body: string;
//   labels: string[];
//   owner: { login: string };
//   created_at: string;
// }

// type ListProps = {
//   items: UserItem[] | OwnerItem[];
// };

// const List: React.FC<ListProps> = ({ items }) => {
//   return (
//     <div className="list">
//       {items.map((item) => (
//         <ListItem
//           key={item.id}
//           title={item.title}
//           body={item.body}
//           labels={item.labels}
//           user={item.user.login || item.owner.login}
//           created_at={item.created_at}
//         />
//       ))}
//     </div>
//   );
// };

// export default List;
import React from 'react';
import ListItem from './IssueListItem';

interface UserItem {
  id: string;
  title: string;
  body: string;
  labels: string[];
  user: { login: string };
  created_at: string;
}

type ListProps = {
  items: UserItem[];
};

const IssueList: React.FC<ListProps> = ({ items }) => {
  return (
    <div className="list">
      {items.map((item) => (
        <ListItem
          key={item.id}
          title={item.title}
          body={item.body}
          labels={item.labels}
          user={item.user.login}
          created_at={item.created_at}
        />
      ))}
    </div>
  );
};

export default IssueList;
