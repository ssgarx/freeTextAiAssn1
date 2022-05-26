import React from "react";
import styles from "./PaginateBox.module.scss";
import arrowLeftIcon from "../assets/arrowLeftIcon.svg";

function PaginateBox({ membersData, handlePageClick, page, searchedResults }) {
  return (
    (searchedResults?.length > 0 ? searchedResults : membersData) && (
      <div className={styles.pagiBox}>
        <div>
          <button onClick={() => handlePageClick(null, false, true)}>
            <img src={arrowLeftIcon} alt="arrowLeftIcon" />
          </button>
          {[
            ...Array(
              Math.ceil(
                (searchedResults?.length > 0 ? searchedResults : membersData)
                  ?.length / 10
              )
            ),
          ].map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                style={{
                  transform: index + 1 === page ? "scale(1.5)" : "",
                }}
              >
                {index + 1}
              </button>
            );
          })}
          <button onClick={() => handlePageClick(null, true, false)}>
            <img src={arrowLeftIcon} alt="arrowLeftIcon" />
          </button>
        </div>
      </div>
    )
  );
}

export default PaginateBox;
