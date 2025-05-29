import { Button, Card, Container, Form } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [formulario, setFormulario] = useState({});
  const [isEnabled, setIsEnabled] = useState(true);
  const [answers, setAnswers] = useState({});

  const questionnarie = {
    preguntas: [
      "¿El tutor demuestra un buen conocimiento de la materia?",
      "¿El tutor está bien preparado para las sesiones?",
      "¿El tutor explica los conceptos claramente?",
      "¿El tutor utiliza ejemplos prácticos para facilitar el aprendizaje?",
      "¿El tutor adapta sus métodos de enseñanza según las necesidades del estudiante?",
      "¿El tutor fomenta una buena comunicación?",
      "¿El tutor es puntual y respetuoso con el tiempo?",
      "¿El tutor demuestra interés genuino en el progreso del estudiante?"
    ],
    opciones: ["Siempre", "Casi siempre", "A veces", "Nunca"]
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("pregunta_")) {
      setAnswers({ ...answers, [name]: value });
    } else {
      const obj = { ...formulario, [name]: value };
      setFormulario(obj);

      if (
        obj.TutorName &&
        obj.StudentName &&
        obj.Subject
      ) {
        setIsEnabled(false);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const questionsUnanswered = [];
    questionnarie.preguntas.forEach((_, i) => {
      if (!answers[`pregunta_${i}`]) {
        questionsUnanswered.push(i + 1);
      }
    });

    if (questionsUnanswered.length > 0) {
      Swal.fire(
        "Ops, parece que faltan preguntas por contestar",
        questionsUnanswered.join(`, `),
        "error"
      );
      return;
    }

    Swal.fire("Enviando respuestas...");
    Swal.showLoading();

    try {
      await axios.post("http://localhost:4000/save-answers", {
        ...formulario,
        respuestas: answers,
      });
      Swal.fire("Respuestas almacenadas con éxito", "", "success");
    } catch (error) {
      Swal.fire("Ocurrió un error al guardar las respuestas", error.message, "error");
    }
  };

  return (
    <Container className="mt-3">
      <Card>
        <Card.Body>
          <Card.Title>Formulario de evaluación docentes</Card.Title>

          <Form.Group className="mb-3">
            <Form.Label>Nombre del Tutor</Form.Label>
            <Form.Control type="text" name="TutorName" onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre del Estudiante</Form.Label>
            <Form.Control type="text" name="StudentName" onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Materia</Form.Label>
            <Form.Control type="text" name="Subject" onChange={onChange} />
          </Form.Group>

          <Form onSubmit={onSubmit}>
            {questionnarie.preguntas.map((pregunta, i) => (
              <Form.Group key={`q-${i}`} className="mb-3">
                <Form.Label>{`${i + 1}. ${pregunta}`}</Form.Label>
                {questionnarie.opciones.map((opcion, io) => (
                  <Form.Check
                    key={`${i}-${io}`}
                    type="radio"
                    id={`q${i}-option${io}`}
                    name={`pregunta_${i}`}
                    value={opcion}
                    label={opcion}
                    onChange={onChange}
                  />
                ))}
              </Form.Group>
            ))}
            <Button type="submit" variant="primary" disabled={isEnabled}>
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
