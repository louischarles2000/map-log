import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#f8c102',
      main: '#f8c102'
    },
    text: {
      primary: '#fff',
      secondary: '#ccc'
    },
    background: {
      default: '#555'
    }
  },
  typography: {
    fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    h1: {
        fontSize: '4em',
        wordSpacing: '4px',
        letterSpacing: '2px'
    },
    h5:{
      color: '#000'
    },
    h4: {
      wordSpacing: '2px',
      letterSpacing: '1px',
      color: '#f8c102',
      fontSize: '25px',
      textAlign: 'center'
    },
    body1: {
      textTransform: 'capitalize',
      fontWeight: 'bold'
    }
  }
});