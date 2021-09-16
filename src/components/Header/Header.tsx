import React from 'react';
import styled from 'styled-components';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ToolbarStyle = styled.div`
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
`;

export const Header: React.FC = () => {
  return (
    <ToolbarStyle>
      <AppBar position="relative">
        <Toolbar className="toolbar">
          <Typography variant="h6" color="inherit" noWrap>
            <Link className="link" to="/">
              To Do List
            </Link>
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            <Link className="link" to="/archive">
              Archive
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </ToolbarStyle>
  );
};
