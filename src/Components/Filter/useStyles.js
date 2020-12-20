import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  divBorder: {
    display: "flex",
    border: '2px',
    justifyContent: "center",
  },
  btnFilter: {
    height: "2rem",
    margin: "auto 0"
  }
}));
