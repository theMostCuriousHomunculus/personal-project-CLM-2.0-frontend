import React from 'react';
import { Link, useParams } from 'react-router-dom';
import MUIButton from '@material-ui/core/Button';
import MUICard from '@material-ui/core/Card';
import MUICardActions from '@material-ui/core/CardActions';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUIDeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MUIThumbDownIcon from '@material-ui/icons/ThumbDown';
import MUIThumbUpIcon from '@material-ui/icons/ThumbUp';
import MUITypography from '@material-ui/core/Typography';

import SmallAvatar from '../miscellaneous/SmallAvatar';
import WarningButton from '../miscellaneous/WarningButton';
import { AuthenticationContext } from '../../contexts/authentication-context';
import { useRequest } from '../../hooks/request-hook';

const ExistingComment = (props) => {

  const authentication = React.useContext(AuthenticationContext);
  const blogPostId = useParams().blogPostId;
  const { author } = props.comment;
  const { sendRequest } = useRequest();

  async function deleteComment () {
    try {
      const updatedBlogPost = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/blog/${blogPostId}/${props.comment._id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + authentication.token
        }
      );
      props.deleteComment(updatedBlogPost);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MUICard>
      <MUICardHeader
        avatar={<SmallAvatar alt={author.name} src={author.avatar}/>}
        disableTypography={true}
        title={<MUITypography color="textPrimary" variant="body1">
          <Link to={`/account/${author._id}`}>{author.name}</Link>
        </MUITypography>}
        subheader={<MUITypography color="textSecondary" variant="body2">Last updated {new Date(props.comment.updatedAt).toLocaleString()}</MUITypography>}
      />
      <MUICardContent>
        <MUITypography variant="body1">{props.comment.body}</MUITypography>
      </MUICardContent>
      <MUICardActions>
        {author._id === authentication.userId ?
          <WarningButton
            onClick={deleteComment}
            startIcon={<MUIDeleteForeverIcon />}
          >
            Delete
          </WarningButton> :
          <React.Fragment>
            <MUITypography variant="body2">These buttons don't actually do anything yet but feel free to press them anyway!</MUITypography>
            <WarningButton startIcon={<MUIThumbDownIcon />}>
              
            </WarningButton>
            <MUIButton color="primary" size="small" startIcon={<MUIThumbUpIcon />} variant="contained">

            </MUIButton>
          </React.Fragment>
        }
      </MUICardActions>
    </MUICard>
  );
}

export default ExistingComment;