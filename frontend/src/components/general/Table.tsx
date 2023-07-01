import React, { FC } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Pagination,
  Box,
} from "@mui/material";

import Loading from "./Loading";
import EmptyMessage from "./EmptyMessage";

type RowComponentProps = {
  row: any;
  index: number;
};

type TableProps = {
  rows: any[];
  heads: any[];
  Row: React.ReactElement<RowComponentProps>;
  count: number;
  page?: number;
  handleChangePage?: (event: React.ChangeEvent<unknown>, value: number) => void;
  rowsPerPage?: number;
  isSelectable?:
    | {
        selectedRows: any[];
        handleCheckAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
      }
    | false;

  loading?: boolean;
  name: string;
};

const Table: FC<TableProps> = ({
  rows,
  heads,
  count,
  Row,
  handleChangePage = () => {},
  page = 0,
  rowsPerPage = 6,
  isSelectable,
  loading = false,
  name,
}) => {
  const isAllRowsSelected =
    rows && isSelectable && isSelectable.selectedRows.length === rows.length;

  const isSomeRowsSelected =
    rows &&
    isSelectable &&
    isSelectable.selectedRows.length > 0 &&
    isSelectable.selectedRows.length < rows.length;

  return (
    <>
      {loading ? (
        <Loading height="40vh" />
      ) : count && count > 0 ? (
        <>
          <TableContainer>
            <MUITable sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ pr: isSelectable ? "17px" : "9px" }}>
                  {isSelectable && (
                    <TableCell sx={{ px: 1, width: "58px" }}>
                      <Checkbox
                        color="success"
                        indeterminate={isSomeRowsSelected}
                        checked={isAllRowsSelected}
                        onChange={isSelectable.handleCheckAll}
                      />
                    </TableCell>
                  )}
                  {heads.map((head: any, headIndex: number) => (
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 16,
                        px: 1,
                      }}
                      align={head.align}
                      key={head.label || headIndex}
                    >
                      {head.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row: any, index: number) => (
                    <React.Fragment key={index}>
                      {React.cloneElement(
                        Row as React.ReactElement<RowComponentProps>,
                        {
                          row,
                          index,
                        }
                      )}
                    </React.Fragment>
                  ))}
              </TableBody>
            </MUITable>
          </TableContainer>
          {count > rowsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                count={rows ? Math.ceil(count / rowsPerPage) : 1}
                variant="outlined"
                onChange={handleChangePage}
                page={page + 1}
                sx={{ mt: 2 }}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
        <EmptyMessage name={name} />
      )}
    </>
  );
};

export default Table;
