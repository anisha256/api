import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Spinner from '../../components/Spinner';
const RejectedLists = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [rejectedLits, setRejectedLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/admin/project/lists/rejected',
        {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      setRejectedLists(data.data);
      setLoading(false);
      console.log(rejectedLits);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContainer>
      {loading && <Spinner />}

      {!loading && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer
          //  sx={{ maxHeight: 600 }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Project Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Email
                  </TableCell>

                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Country
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: 20 }}>
                    Team Experience
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: 20 }}>
                    Fulltime Workers
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Website URL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rejectedLits
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {' '}
                        <TableCell align="left">{row.projectName}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.country}</TableCell>
                        <TableCell align="center">
                          {row.teamExperience}
                        </TableCell>
                        <TableCell align="center">
                          {row.fullTimeWorker}
                        </TableCell>
                        <TableCell align="left">
                          ${row.websiteUrl.slice(0, 6)}...$
                          {row.websiteUrl.slice(row.websiteUrl.length - 6)}
                          {row.websiteUrl ? (
                            <CopyButton
                              style={{ height: '10px' }}
                              onClick={() => {
                                navigator.clipboard.writeText(row.websiteUrl);
                              }}
                            >
                              <ContentCopyIcon />
                            </CopyButton>
                          ) : (
                            ''
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rejectedLits.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </ProjectsContainer>
  );
};

export default RejectedLists;

const ProjectsContainer = styled.div`
  flex: 4;
  background-image: linear-gradient(
    to top,
    #564480,
    #634f93,
    #705aa6,
    #7d65b9,
    #8b70cd,
    #9b7ed8,
    #ab8ce2,
    #bb9bed,
    #ceb1f1,
    #dfc8f5,
    #eedffa,
    #fcf7ff
  );
`;

const CopyButton = styled.button`
  padding-bottom: 20px;
  font-size: 10px;
  cursor: pointer;
  border: none;
  background: none;
`;
