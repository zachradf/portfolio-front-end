// import React from 'react';
// import './ListItem.css';
// interface ListItemProps {
//   title: string;
//   body: string;
//   labels: string[];
//   user: string;
//   created_at: string;
// }

// const ListItem: React.FC<ListItemProps> = ({
//   title,
//   body,
//   labels,
//   user,
//   created_at,
// }) => {
//   return (
//     <div className="list-item">
//       <div className="list-item-header">
//         <h3>{title}</h3>
//         <div className="labels">
//           {labels.map((label) => (
//             <span key={label} className={`label ${label}`}>
//               {label}
//             </span>
//           ))}
//         </div>
//       </div>
//       <p>{body}</p>
//       <div className="list-item-footer">
//         <span>
//           Opened by {user} on {new Date(created_at).toLocaleDateString()}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ListItem;
import React from 'react';

interface ListItemProps {
  title: string;
  body: string;
  labels: string[];
  user: string;
  created_at: string;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  body,
  labels,
  user,
  created_at,
}) => {
  return (
    <div className="list-item">
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="labels">
        {labels.map((label) => (
          <span key={label} className="label">
            {label}
          </span>
        ))}
      </div>
      <div className="list-item-footer">
        {user} on {new Date(created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ListItem;
