import React, { useState, useEffect } from "react";

import styles from "./Home.module.scss";

import deleteIcon from "../assets/deleteIcon.svg";

import PaginateBox from "../components/PaginateBox";
import SearchBox from "../components/SearchBox";
import TableHolder from "../components/TableHolder";
import LineLoader from "../components/LineLoader";

let tapSort = 0;
function Home() {
  const [membersData, setMembersData] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isFetching, setIsFetching] = useState(null);
  const [selected, setSelected] = useState([]);
  const [paginatedMembersData, setPaginatedMembersData] = useState([]);
  const [page, setPage] = useState(1);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    fetchMembersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchedText && handleSearch(searchedText);
      if (searchedText?.length === 0) {
        // fetchMembersData();
        setSearchedResults([]);
        handlePaginate();
        setIsSelectedAll(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedText]);

  const handleSearch = (searchedText) => {
    let result = membersData?.filter(
      (item) =>
        !(
          item.name.toLowerCase().indexOf(searchedText) === -1 &&
          item.role.toLowerCase().indexOf(searchedText) === -1 &&
          item.email.toLowerCase().indexOf(searchedText) === -1
        )
    );
    setIsSelectedAll(false);
    setSelected([]);
    setSearchedResults(result);
    handlePaginate(result, 1);
  };

  const fetchMembersData = async () => {
    setIsFetching(true);

    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setIsFetching(false);
        setMembersData(data);
        handlePaginate(data, 1);
      })
      .catch((error) => {
        setIsFetching(false);
      });
  };

  const handlePaginate = (data = null, pagex = 1) => {
    let tmpArr = [];

    let tmpData = data ?? membersData;
    tmpData?.forEach((userObject, index) => {
      if (index >= (pagex - 1) * 10 && index < pagex * 10) {
        tmpArr.push(tmpData[index]);
      }
    });
    setPaginatedMembersData(tmpArr);
    tmpData = null;
  };

  const handlePageClick = (
    index = null,
    isIncrement = null,
    isDecrement = null
  ) => {
    setIsSelectedAll(false);
    setSelected([]);
    if (!isIncrement && !isDecrement) {
      handlePaginate(
        searchedResults?.length > 0 ? searchedResults : null,
        index
      );
      setPage(index);
    } else if (isIncrement) {
      setPage((prev) => {
        if (
          prev ===
          Math.ceil(
            ((searchedResults?.length > 0 ? searchedResults : membersData)
              ?.length +
              1) /
              10
          )
        ) {
          return prev;
        }
        handlePaginate(
          searchedResults?.length > 0 ? searchedResults : null,
          prev + 1
        );
        return prev + 1;
      });
    } else {
      setPage((prev) => {
        if (prev === 1) {
          return prev;
        }
        handlePaginate(
          searchedResults?.length > 0 ? searchedResults : null,
          prev - 1
        );
        return prev - 1;
      });
    }
  };

  const handleSelect = (id) => {
    setIsSelectedAll(false);
    if (selected.includes(id)) {
      setSelected(() => {
        let tmp = selected.filter((item) => item !== id);
        if (tmp?.length === paginatedMembersData?.length) {
          setIsSelectedAll(true);
        } else {
          setIsSelectedAll(false);
        }
        return tmp;
      });
    } else {
      setSelected((prev) => {
        let tmp = [...prev, id];
        if (tmp?.length === paginatedMembersData?.length) {
          setIsSelectedAll(true);
        } else {
          setIsSelectedAll(false);
        }
        return tmp;
      });
    }
  };

  const handleSelectAll = () => {
    setIsSelectedAll(!isSelectedAll);
    if (selected?.length === paginatedMembersData?.length) {
      setSelected([]);
    } else {
      let tmpSelected = [];
      paginatedMembersData?.forEach((member) => {
        tmpSelected.push(member.id);
      });
      setSelected(tmpSelected);
      tmpSelected = [];
    }
  };

  const handleSingleDelete = (id) => {
    setPaginatedMembersData((prev) => {
      return prev.filter((member) => member.id !== id);
    });
    setMembersData((prev) => {
      return prev.filter((member) => member.id !== id);
    });
    if (searchedResults?.length > 0) {
      setSearchedResults((prev) => {
        return prev.filter((member) => member.id !== id);
      });
    }
    setIsSelectedAll(false);
  };

  const handleDeleteAll = () => {
    let paginatedMembersDataTmp = paginatedMembersData;
    let membersDataTmp = membersData;
    let searchedResultsTmp = searchedResults;
    selected?.forEach((member) => {
      let index1 = membersDataTmp
        .map((e) => {
          return e.id;
        })
        .indexOf(member);
      membersDataTmp?.splice(index1, 1);

      let index2 = paginatedMembersDataTmp
        .map((e) => {
          return e.id;
        })
        .indexOf(member);
      paginatedMembersDataTmp?.splice(index2, 1);

      if (searchedResults?.length > 0) {
        let index3 = searchedResultsTmp
          .map((e) => {
            return e.id;
          })
          ?.indexOf(member);
        searchedResultsTmp?.splice(index3, 1);
      }
    });
    setPaginatedMembersData(paginatedMembersDataTmp);
    setMembersData(membersDataTmp);
    searchedResults?.length > 0 && setSearchedResults(searchedResultsTmp);
    handlePaginate(paginatedMembersDataTmp, page);
    setIsSelectedAll(false);
  };

  const handleEdit = () => {
    alert("cant edit :( ");
  };

  const handleTapSort = (col) => {
    let sortTmp = tapSort === 0 ? 1 : tapSort === 1 ? 2 : 0;
    tapSort = sortTmp;

    if (tapSort === 0 || tapSort === 1) {
      let membersDataTmp =
        searchedResults?.length > 0 ? searchedResults : membersData;
      membersDataTmp?.sort((a, b) => {
        let item1 =
          col === "name"
            ? a.name.toLowerCase()
            : col === "email"
            ? a.email.toLowerCase()
            : a.role.toLowerCase();
        let item2 =
          col === "name"
            ? b.name.toLowerCase()
            : col === "email"
            ? b.email.toLowerCase()
            : b.role.toLowerCase();
        if (tapSort === 0) {
          if (item1 < item2) return 1; //sort string ascending
          if (item1 > item2) return -1; //sort string decending
          return 0; //default return value (no sorting)
        } else {
          if (item1 < item2) return -1;
          if (item1 > item2) return 1;
          return 0;
        }
      });
      handlePaginate(membersDataTmp, 1);
    } else {
      searchedResults?.length > 0
        ? handleSearch(searchedText)
        : fetchMembersData();
    }
  };

  return (
    <div className={styles.homeBox}>
      <div className={styles.hbContent}>
        <div className={styles.hbcUpper}>
          <div className={styles.hbcUpperLeft}>
            <p>freeTextAI✨</p>
          </div>
        </div>
        <div className={styles.hbcLower}>
          <SearchBox
            searchedText={searchedText}
            setSearchedText={setSearchedText}
          />
          {selected?.length > 0 && (
            <button onClick={handleDeleteAll} className={styles.hbclDeleteBtn}>
              <span>
                <img
                  style={{
                    marginRight: "10px",
                    position: "relative",
                    top: "2px",
                  }}
                  src={deleteIcon}
                  alt="deleteIcon"
                />
              </span>
              delete
            </button>
          )}
        </div>
        {isFetching === true ? (
          <LineLoader />
        ) : isFetching === false ? (
          <>
            <TableHolder
              handleSelect={handleSelect}
              selected={selected}
              handleSingleDelete={handleSingleDelete}
              handleEdit={handleEdit}
              paginatedMembersData={paginatedMembersData}
              handleSelectAll={handleSelectAll}
              isSelectedAll={isSelectedAll}
              handleTapSort={handleTapSort}
            />
            <PaginateBox
              membersData={membersData}
              handlePageClick={handlePageClick}
              page={page}
              searchedResults={searchedResults}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Home;