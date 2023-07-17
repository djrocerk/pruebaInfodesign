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

function Cliente() {
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

    const processChartData = (data) => {
        const labels = data.map((item) => item.Linea);
        const consumoResidencial = data.map((item) => item.consumo_residencial);
        const consumoComercial = data.map((item) => item.consumo_comercial);
        const consumoIndustrial = data.map((item) => item.consumo_industrial);
        const perdidasResidencial = data.map((item) => item.perdidas_residencial);
        const perdidasComercial = data.map((item) => item.perdidas_comercial);
        const perdidasIndustrial = data.map((item) => item.perdidas_industrial);
        const costoResidencial = data.map((item) => item.costo_residencial);
        const costoComercial = data.map((item) => item.costo_comercial);
        const costoIndustrial = data.map((item) => item.costo_industrial);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Consumo Residencial',
                    data: consumoResidencial,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Consumo Comercial',
                    data: consumoComercial,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: 'Consumo Industrial',
                    data: consumoIndustrial,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Perdidas Residencial',
                    data: perdidasResidencial,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: 'Perdidas Comercial',
                    data: perdidasComercial,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: 'Perdidas Industrial',
                    data: perdidasIndustrial,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: 'Costo Residencial',
                    data: costoResidencial,
                    borderColor: 'rgba(60, 255, 51, 1)', 
                    backgroundColor: 'rgba(213, 254, 211, 0.2)', 
                  },
                  {
                    label: 'Costo Comercial',
                    data: costoComercial,
                    borderColor: 'rgba(255, 255, 255, 1)', 
                    backgroundColor: 'rgba(246, 246, 246, 0.2)', 
                  },
                  {
                    label: 'Costo Industrial',
                    data: costoIndustrial,
                    borderColor: 'rgba(255, 0, 0, 1)', 
                    backgroundColor: 'rgba(255, 210, 210, 0.2)', 
                  },
            ],
        };

        setChartData(chartData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/cliente', {
                fechainicial,
                fechafinal,
            });
            setData(response.data);
            processChartData(response.data);
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
                            <TableCell align='center'>Linea</TableCell>
                            <TableCell align='center'>Consumo residencial</TableCell>
                            <TableCell align='center'>Consumo comercial</TableCell>
                            <TableCell align='center'>Consumo industrial</TableCell>
                            <TableCell align='center'>Perdidas residencial</TableCell>
                            <TableCell align='center'>Perdidas comercial</TableCell>
                            <TableCell align='center'>Perdidas industrial</TableCell>
                            <TableCell align='center'>Costo residencial</TableCell>
                            <TableCell align='center'>Costo comercial</TableCell>
                            <TableCell align='center'>Costo industrial</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.Linea}>
                                <TableCell align='center'>{item.Linea}</TableCell>
                                <TableCell align='center'>{item.consumo_residencial}</TableCell>
                                <TableCell align='center'>{item.consumo_comercial}</TableCell>
                                <TableCell align='center'>{item.consumo_industrial}</TableCell>
                                <TableCell align='center'>{item.perdidas_residencial}</TableCell>
                                <TableCell align='center'>{item.perdidas_comercial}</TableCell>
                                <TableCell align='center'>{item.perdidas_industrial}</TableCell>
                                <TableCell align='center'>{item.costo_residencial}</TableCell>
                                <TableCell align='center'>{item.costo_comercial}</TableCell>
                                <TableCell align='center'>{item.costo_industrial}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {Object.keys(chartData).length !== 0 && <Line data={chartData} />}
        </div>
    );
}

export default Cliente;
