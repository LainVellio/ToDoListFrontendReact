import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

const Window = styled.div`
  position: absolute;
  left: 39px;
  width: 237px;
  height: 50px;
  margin-top: 2px;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  border-top: 1px solid #d1d1d1;
  z-index: 2;
`;

const Menu = styled.div<{ topShift: number }>`
  .menu {
    position: relative;
    top: 0px;
    left: 0px;
    padding: 0 1px;
    z-index: 1;
    animation: menuSlide 0.5s ease-in-out;
  }
  .paper {
    border-radius: 0px 0px 3px 3px;
    display: flex;
    align-items: center;
    width: 235px;
  }
  @keyframes menuSlide {
    from {
      top: -${(props) => props.topShift}px;
    }
    to {
      top: 0px;
    }
  }
  @media screen and (max-width: 400px) {
    .paper {
      width: 205px;
    }
  }
`;

interface MenuWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  topShift: number;
}

export const MenuWrapper = ({ children, topShift }: MenuWrapperProps) => {
  return (
    <Window>
      <Menu topShift={topShift}>
        <div className="menu">
          <Paper className="paper">{children}</Paper>
        </div>
      </Menu>
    </Window>
  );
};
