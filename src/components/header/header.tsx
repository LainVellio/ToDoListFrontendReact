import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = () => (
  <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        To Do List
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
