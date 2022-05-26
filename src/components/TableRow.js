import React from "react";
import styles from "./TableHolder.module.scss";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

function TableRow({
  name,
  role,
  email,
  id,
  handleSelect,
  selected,
  handleSingleDelete,
  handleEdit,
}) {
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
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td>
          <div className={styles.actionBox}>
            <button onClick={() => handleSingleDelete(id)}>
              <img src={deleteIcon} alt="deleteIcon" />
            </button>
            <button onClick={handleEdit}>
              <img src={editIcon} alt="editIcon" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
