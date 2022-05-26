import React from "react";
import styles from "./TableHolder.module.scss";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";
import saveIcon from "../assets/saveIcon.svg";
import { useState } from "react";

function TableRow({
  name,
  role,
  email,
  id,
  handleSelect,
  selected,
  handleSingleDelete,
  handleSaveEdit,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedRole, setEditedRole] = useState(role);

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      <tr>
        <td>
          <label className={styles.container}>
            <input
              onChange={() => handleSelect(id)}
              type="checkbox"
              checked={selected?.includes(id)}
            />
            <span className={styles.checkmark} />
          </label>
        </td>
        {isEdit ? (
          <>
            <td>
              <input
                className={styles.edit}
                placeholder={name}
                type="text"
                autoFocus
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </td>
            <td>
              <input
                className={styles.edit}
                placeholder={email}
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                className={styles.edit}
                placeholder={role}
                type="text"
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
              />
            </td>
          </>
        ) : (
          <>
            <td>{editedName}</td>
            <td>{editedEmail}</td>
            <td>{editedRole}</td>
          </>
        )}
        <td>
          <div className={styles.actionBox}>
            <button onClick={() => handleSingleDelete(id)}>
              <img src={deleteIcon} alt="deleteIcon" />
            </button>

            {isEdit ? (
              <button
                onClick={() => {
                  handleSaveEdit(id, {
                    id: id,
                    name: editedName,
                    email: editedEmail,
                    role: editedRole,
                  });
                  setIsEdit(false);
                }}
              >
                <img src={saveIcon} alt="saveIcon" />
              </button>
            ) : (
              <button onClick={handleEdit}>
                <img src={editIcon} alt="editIcon" />
              </button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
