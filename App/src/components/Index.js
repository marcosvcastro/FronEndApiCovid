import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { getErrosFromApi } from '../utils/errorsHelper';
import covid19Service from '../service/covid19Service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const styles = theme => ({
});

function Index() {
  const [message, setMessage] = useState({
    messageOpen: false,
    variantMessage: '',
    messageText: ''
  });
  const [arrayData, setArrayData] = useState([]);


  useEffect(() => {
  }, []);

  async function handlerListAvarage() {
    try {
      let data = await covid19Service.listAvarage(3);
      setArrayData(data.data)
      setMessage({
        messageOpen: true,
        messageText: 'Médias atualizadas com sucesso!',
        variantMessage: 'success'
      });

    } catch (e) {
      setMessage({
        messageOpen: true,
        messageText: getErrosFromApi(e),
        variantMessage: 'error'
      });
    }
  }

  async function handlerSaveUpdateData() {
    try {
      await covid19Service.saveUpdateData();
      setMessage({
        messageOpen: true,
        messageText: 'Informações atualizadas com sucesso!',
        variantMessage: 'success'
      });
    } catch (e) {
      setMessage({
        messageOpen: true,
        messageText: getErrosFromApi(e),
        variantMessage: 'error'
      });
    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
      <Snackbar open={message.messageOpen} onClose={() => setMessage({ messageOpen: false, messageText: '', variantMessage: 'success' })}>
        <Alert severity={message.variantMessage}>
          {message.messageText}
        </Alert>
      </Snackbar>
      <Typography component="h1" variant="h5">
        Api médias
          </Typography>

      <br />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={styles.button}
        startIcon={<SaveIcon />}
        onClick={handlerSaveUpdateData}
      >
        Consultar baixar/atualizar dados
      </Button>
      <br />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={styles.button}
        startIcon={<RefreshIcon />}
        onClick={handlerListAvarage}
      >
        Buscar médias
      </Button>

      <br />
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Semana</TableCell>
              <TableCell align="right">Média de casos confirmados</TableCell>
              <TableCell align="right">Média de casos de mortes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayData.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right">{row.week}</TableCell>
                <TableCell align="right">{row.averageConfirmed}</TableCell>
                <TableCell align="right">{row.averageDeaths}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);

