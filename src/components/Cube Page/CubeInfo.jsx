import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MUIAvatar from '@material-ui/core/Avatar';
import MUICard from '@material-ui/core/Card';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUITextField from '@material-ui/core/TextField';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { AuthenticationContext } from '../../contexts/authentication-context';
import { useCube } from '../../hooks/cube-hook';
import { useRequest } from '../../hooks/request-hook';

const useStyles = makeStyles({
  avatarLarge: {
    height: "150px",
    width: "150px"
  }
});

const CubeInfo = (props) => {

  const cubeId = useParams().cubeId;
  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const [cubeState, dispatch] = useCube(true);
  const { sendRequest } = useRequest();

  async function submitCubeChanges () {
    const cubeChanges = JSON.stringify({
      action: 'edit_cube_info',
      cube_id: cubeId,
      description: cubeState.cube_description,
      name: cubeState.cube_name
    });
    const updatedCube = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/cube`,
      'PATCH',
      cubeChanges,
      {
        Authorization: 'Bearer ' + authentication.token,
        'Content-Type': 'application/json'
      }
    );
    dispatch('UPDATE_CUBE', updatedCube);
  }

  return (
    <MUICard>

      <MUICardHeader
        avatar={props.creator.avatar &&
          <MUIAvatar alt={props.creator.name} className={classes.avatarLarge} src={props.creator.avatar} />
        }
        title={authentication.userId === cubeState.cube.creator ?
          <MUITextField
            label="Cube Name"
            onBlur={submitCubeChanges}
            onChange={(event) => dispatch('CHANGE_CUBE_NAME', event.target.value)}
            type="text"
            value={cubeState.cube_name}
            variant="outlined"
          /> :
          <MUITypography variant="h2">{cubeState.cube_name}</MUITypography>
        }
        subheader={
          <MUITypography variant="h3">
            Designed by: <Link to={`/account/${props.creator._id}`}>{props.creator.name}</Link>
          </MUITypography>
        }
      />

      <MUICardContent>
        {authentication.userId === cubeState.cube.creator ?
          <MUITextField
            fullWidth={true}
            label="Cube Description"
            multiline
            onBlur={submitCubeChanges}
            onChange={(event) => dispatch('CHANGE_CUBE_DESCRIPTION', event.target.value)}
            rows={3}
            value={cubeState.cube_description}
            variant="outlined"
          /> :
          <React.Fragment>
            <MUITypography variant="h3">Description:</MUITypography>
            <MUITypography variant="body1">{cubeState.cube_description}</MUITypography>
          </React.Fragment>
        }        
      </MUICardContent>

    </MUICard>
  );
}

export default CubeInfo;