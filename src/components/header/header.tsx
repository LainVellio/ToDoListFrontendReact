import { AppBar, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

interface IProps {
  toggleForm: Function;
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

const Header = ({ toggleForm }: IProps) => {
  const onToggleForm = () => {
    toggleForm();
  };

  return (
    <ToolbarStyle>
      <AppBar position="relative">
        <Toolbar className="toolbar">
          <Typography variant="h6" color="inherit" noWrap>
            To Do List
          </Typography>
          <AddIcon onClick={onToggleForm} className="addButton" />
        </Toolbar>
      </AppBar>
    </ToolbarStyle>
  );
};

export default Header;
