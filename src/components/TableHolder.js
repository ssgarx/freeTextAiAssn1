import React from "react";
import styles from "./TableHolder.module.scss";
import TableRow from "./TableRow";

function TableHolder({
  handleSelect,
  selected,
  handleSingleDelete,
  paginatedMembersData,
  handleSelectAll,
  isSelectedAll,
  handleTapSort,
  handleSaveEdit,
}) {
  return (
    <div className={styles.tableHolderBox}>
      <table>
        <colgroup>
          <col span="1" />
          <col span="1" />
          <col span="1" />
          <col span="1" />
          <col span="1" />
        </colgroup>
        <tbody>
          <tr>
            <th>
              <label className={styles.container}>
                <input
                  onChange={handleSelectAll}
                  type="checkbox"
                  checked={isSelectedAll}
                />
                <span className={styles.checkmark} />
              </label>
            </th>
            <th onClick={() => handleTapSort("name")}>name</th>
            <th onClick={() => handleTapSort("email")}>email</th>
            <th onClick={() => handleTapSort("role")}>role</th>
            <th>actions</th>
          </tr>
          {paginatedMembersData?.map((member) => {
            return (
              <TableRow
                key={member?.id}
                name={member?.name}
                role={member?.role}
                email={member?.email}
                id={member?.id}
                handleSelect={handleSelect}
                selected={selected}
                handleSingleDelete={handleSingleDelete}
                handleSaveEdit={handleSaveEdit}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableHolder;
