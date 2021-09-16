import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ToolbarWrapper = styled.div`
  .toolbar {
    display: flex;
    justify-content: space-between;
  }
  .addButton {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .link {
    color: white;
    text-decoration: none;
  }
  .back {
    display: flex;
    align-items: center;
  }
`;

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <ToolbarWrapper data-testid="header1">
      <AppBar position="relative">
        <Toolbar className="toolbar">
          <Typography variant="h6" color="inherit" noWrap>
            <Link className="link" to="/">
              To Do List
            </Link>
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            {location.pathname === '/archive' ? (
              <Link className="link back" to="/">
                Back <ArrowForwardIcon className="arrow" />
              </Link>
            ) : (
              <Link className="link" to="/archive">
                Archive
              </Link>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </ToolbarWrapper>
  );
};
