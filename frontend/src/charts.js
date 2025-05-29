import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const charts() {
    const [numberAnswers, setNumberAnswers] = useState([]);

    useEffect()=>{
       const getData
        try {
            Swal.fire("cargando datos")
            Swal.showloading()
            const {data} = await axios.get("http://localhost:400/get-answers");
            setNumberAnswers(data);
            Swal.close()

        } catch (error) {
            Swal.fire("opss algo salio mal", error.msg, "error")
        }
    }

  labels: ['siempre', 'a veces', 'casi nunca', 'nunca'],
  datasets: [
    {
      label: '# de respuestas',
      data: [12, 19, 3, 5],//no. de cantidad de respuesta
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function App() {
  return <Doughnut data={data} />;
}