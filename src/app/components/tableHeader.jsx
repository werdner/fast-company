import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item.path) {
            onSort(({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" }));
        } else {
            onSort({ path: item.path, order: "asc" });
        }
    };

    const toggleCaret = (path) => {
        const classes = "bi ms-1 bi-caret-";

        if (selectedSort.path === path) {
            return <i className={classes + (selectedSort.order === "asc" ? "up-fill" : "down-fill")} />;
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column])
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {toggleCaret(columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
