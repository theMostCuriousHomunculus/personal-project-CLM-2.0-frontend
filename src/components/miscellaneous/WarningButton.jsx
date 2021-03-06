import React from 'react';
import MUIButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../../theme';

const useStyles = makeStyles({
  warningButton: {
    backgroundColor: theme.palette.warning.main,
    color: '#111111',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  }
});

const WarningButton = function (props) {

  const { children, onClick, startIcon } = props;

  return (
    <MUIButton
      className={useStyles().warningButton}
      onClick={onClick}
      size="small"
      startIcon={startIcon}
      variant="contained"
    >
      {children}
    </MUIButton>
  );
};

export default WarningButton;