import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Line } from 'react-chartjs-2';

function Tramoscliente() {
    const [data, setData] = useState([]);
    const [fechainicial, setFechaInicial] = useState('');
    const [fechafinal, setFechaFinal] = useState('');
    const [chartData, setChartData] = useState({});

    const handleFechaInicialChange = (event) => {
        setFechaInicial(event.target.value);
    };

    const handleFechaFinalChange = (event) => {
        setFechaFinal(event.target.value);
    };

    const formatChartData = (data) => {
        const labels = data.map((item) => item.Linea);
        const perdidasData = data.map((item) => item.Perdidas);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Perdidas',
                    data: perdidasData,
                    fill: false,
                    borderColor: 'blue',
                },
            ],
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/tramos-cliente', {
                fechainicial,
                fechafinal,
            });

            setData(response.data);

            const chartData = formatChartData(response.data);
            setChartData(chartData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='pagina'>
            <form onSubmit={handleSubmit}>
                <br />
                <label>
                    Fecha Inicial
                    <input
                        type='date'
                        id='datepicker'
                        className='form-control'
                        value={fechainicial}
                        onChange={handleFechaInicialChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    Fecha Final
                    <input
                        type='date'
                        id='datepicker'
                        className='form-control'
                        value={fechafinal}
                        onChange={handleFechaFinalChange}
                    />
                </label>
                <br />
                <br />
                <Button variant='outlined' size='small' type='submit'>
                    Buscar
                </Button>
                <br />
                <br />
            </form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Tipo consumo</TableCell>
                            <TableCell align='center'>Linea</TableCell>
                            <TableCell align='center'>Perdidas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.Linea}>
                                <TableCell align='center'>{item.TipoConsumo}</TableCell>
                                <TableCell align='center'>{item.Linea}</TableCell>
                                <TableCell align='center'>{item.Perdidas}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {Object.keys(chartData).length !== 0 && <Line data={chartData} />}
        </div>
    );
}

export default Tramoscliente;
