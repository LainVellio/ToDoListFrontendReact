import React from 'react';
import styled from 'styled-components';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface HeaderProps {
  toggleForm(): void;
}

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
`;

export const Header: React.FC<HeaderProps> = ({ toggleForm }) => {
  return (
    <ToolbarStyle>
      <AppBar position="relative">
        <Toolbar className="toolbar">
          <Typography variant="h6" color="inherit" noWrap>
            To Do List
          </Typography>
        </Toolbar>
      </AppBar>
    </ToolbarStyle>
  );
};
