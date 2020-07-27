import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 'inherit',
    background: '#f5f5f5'
  },
  paper: {
    padding: theme.spacing(3.2),
    margin: 'auto'
  },
  teksWithCheck: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  teksField: {
    width: theme.spacing(38)
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: theme.spacing(3, 0),
  },
  divider: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  hasil: {
    color: '#696969',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  span: {
    fontSize: '1.5rem',
    color: 'black'
  }
}));

function App() {
  // style props
  const classes = useStyles();

  // dynamic input & checkbox
  const [state, setState] = React.useState(
    [
      { id: '1', nomor: '', checked: false },
      { id: '2', nomor: '', checked: false },
      { id: '3', nomor: '', checked: false },
    ]
  );

  // hasil props
  const [hasil, setHasil] = React.useState(0);

  // snackbar props
  const [openSnackBar, setOpenSnackBar] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  // function untuk update state onChange
  const updateFieldChanged = index => e => {
    let newArr = [...state]; // copying the old state array
    if (e.target.type === 'number') {
      newArr[index].nomor = e.target.value;
    } else {
      newArr[index].checked = e.target.checked;
    }
    setState(newArr); // updated state
  }

  // function untuk menentukan hasil
  const calculate = (opr) => {
    const checkedObject = state.filter(e => e.checked === true);
    if (checkedObject.length > 0) {
      if (checkedObject.filter(e => e.nomor === '').length > 0) {
        setOpenSnackBar(true);
        setMessage('Masukan input untuk field yang tercentang !')
      } else {
        let total = 0;
        switch (opr) {
          case '+':
            checkedObject.forEach(i => total += parseInt(i.nomor));
            setHasil(total);
            break;
          case '-':
            checkedObject.forEach(i => {
              if (total === 0) {
                total = parseInt(checkedObject[0].nomor)
              } else {
                total -= parseInt(i.nomor)
              }
            });
            setHasil(total);
            break;
          case 'x':
            checkedObject.forEach(i => {
              if (total === 0) {
                total = parseInt(checkedObject[0].nomor)
              } else {
                total *= parseInt(i.nomor)
              }
            });
            setHasil(total);
            break;
          case '/':
            checkedObject.forEach(i => {
              if (total === 0) {
                total = parseInt(checkedObject[0].nomor)
              } else {
                total /= parseInt(i.nomor)
              }
            });
            setHasil(total);
            break;
          default:
            break;
        }
      }
    } else {
      setOpenSnackBar(true);
      setMessage('Input belum terpilih. Silahkan pilih centang.')
    }
  };

  // render
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <React.Fragment>
          {state.map((obj, index) =>
            <div
              key={`div${index}`}
              className={classes.teksWithCheck}
            >
              <TextField
                className={classes.teksField}
                key={`teks${index}`}
                type="number"
                variant="outlined"
                onChange={updateFieldChanged(index)}
              />
              <Checkbox
                key={`check${index}`}
                onChange={updateFieldChanged(index)}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          )
          }
        </React.Fragment>
        <div className={classes.btnContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => calculate('+')}
          >
            +
        </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => calculate('-')}
          >
            -
        </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => calculate('x')}
          >
            x
        </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => calculate('/')}
          >
            /
        </Button>
        </div>
        <Divider className={classes.divider} />
        <Typography className={classes.hasil} variant="h6">Hasil : <span className={classes.span}>{hasil}</span></Typography>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}

export default App;
