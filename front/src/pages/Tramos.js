import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
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

function Tramos() {
    const [data, setData] = useState([]);
    const [fechainicial, setFechaInicial] = useState('');
    const [fechafinal, setFechaFinal] = useState('');

    const handleFechaInicialChange = (event) => {
        setFechaInicial(event.target.value);
    };

    const handleFechaFinalChange = (event) => {
        setFechaFinal(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/tramos', { fechainicial, fechafinal });
            setData(response.data);
            createChart(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createChart = (chartData) => {
        const ctx = document.getElementById('chart').getContext('2d');
        const labels = chartData.map((item) => item.Linea);
        const consumoData = chartData.map((item) => item.consumo);
        const perdidasData = chartData.map((item) => item.perdidas);
        const costoData = chartData.map((item) => item.costo);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Consumo',
                        data: consumoData,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    },
                    {
                        label: 'Perdidas',
                        data: perdidasData,
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    },
                    {
                        label: 'Costo',
                        data: costoData,
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        display: true,
                    },
                },
            },
        });
    };

    useEffect(() => {
        const chartContainer = document.getElementById('chart');
        if (chartContainer) {
            chartContainer.innerHTML = '';
        }
    }, []);

    return (
        <div className='pagina'>
            <form onSubmit={handleSubmit}>
                <br />
                <label>
                    Fecha Inicial
                    <input type='date' id='datepicker' className='form-control' value={fechainicial} onChange={handleFechaInicialChange} />
                </label>
                <br /><br />
                <label>
                    Fecha Final
                    <input type='date' id='datepicker' className='form-control' value={fechafinal} onChange={handleFechaFinalChange} />
                </label>
                <br /><br />
                <Button variant='outlined' size='small' type='submit'>
                    Buscar
                </Button>
                <br /><br />
            </form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Linea</TableCell>
                            <TableCell align='center'>Consumo</TableCell>
                            <TableCell align='center'>Perdidas</TableCell>
                            <TableCell align='center'>Costo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.Linea}>
                                <TableCell align='center'>{item.Linea}</TableCell>
                                <TableCell align='center'>{item.consumo}</TableCell>
                                <TableCell align='center'>{item.perdidas}</TableCell>
                                <TableCell align='center'>{item.costo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <canvas id='chart' width='400' height='200'></canvas>
        </div>
    );
}

export default Tramos;
