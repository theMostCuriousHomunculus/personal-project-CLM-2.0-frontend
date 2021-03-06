import React from 'react';
import MUIAccountCircleIcon from '@material-ui/icons/AccountCircle';
import MUIAllInclusiveIcon from '@material-ui/icons/AllInclusive';
import MUIChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import MUIExitToAppIcon from '@material-ui/icons/ExitToApp';
import MUIHomeIcon from '@material-ui/icons/Home';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemIcon from '@material-ui/core/ListItemIcon';
import MUIListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../../theme';
import { AuthenticationContext } from '../../contexts/authentication-context';

const useStyles = makeStyles({
  item: {
    color: theme.palette.secondary.main,
    '& span, & svg': {
      fontSize: '1.6rem'
    }
  },
  list: {
    width: 350
  }
});

function NavigationLinks (props) {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const { history } = props;

  const loggedInPages = [
    {
      icon: <MUIHomeIcon />,
      name: "Home",
      onClick: () => history.push('/')
    },
    {
      icon: <MUIAccountCircleIcon />,
      name: "My Profile",
      onClick: () => history.push('/account/' + authentication.userId)
    },
    {
      icon: <MUIChatOutlinedIcon />,
      name: "Blog",
      onClick: () => history.push('/blog')
    },
    {
      icon: <MUIAllInclusiveIcon />,
      name: "Resources",
      onClick: () => history.push('/resources')
    },
    {
      icon: <MUIExitToAppIcon />,
      name: "Logout",
      onClick: authentication.logout
    }
  ];

  const loggedOutPages = [
    {
      icon: <MUIHomeIcon />,
      name: "Home",
      onClick: () => history.push('/')
    },
    {
      icon: <MUIChatOutlinedIcon />,
      name: "Blog",
      onClick: () => history.push('/blog')
    },
    {
      icon: <MUIAllInclusiveIcon />,
      name: "Resources",
      onClick: () => history.push('/resources')
    },
    {
      icon: <MUIExitToAppIcon />,
      name: "Login / Register",
      onClick: () => props.setAuthenticateFormDisplayed(true)
    }
  ];

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <MUIList>
        {
          (authentication.isLoggedIn ? loggedInPages : loggedOutPages).map(function (page) {
            return (
              <MUIListItem button key={page.name} onClick={page.onClick}>
                <MUIListItemIcon className={classes.item}>{page.icon}</MUIListItemIcon>
                <MUIListItemText className={classes.item} primary={page.name} />
              </MUIListItem>
            );
          })
        }
      </MUIList>
    </div>
  );
}

export default NavigationLinks;