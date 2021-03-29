import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    cardBody: {
      padding: "0.9375rem 20px",
      flex: "1 1 auto",
      WebkitBoxFlex: "1",
      position: "relative",
      minWidth: 300
    },
    divider: {
      width: '100%',
      margin: '5px 0px'
    },
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    popup: {
      backgroundColor: '#292929',
      padding: 0,
      margin: 0
    }
  }));

  export default useStyles;