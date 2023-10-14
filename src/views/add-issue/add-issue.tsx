import { Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import useCustomForm from '../../api/hooks/useCustomForm.hook';
import { createIssue, issueById, updateIssue } from '../../redux/asyncThunk/issue.thunk';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from './index.module.sass';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AddIssue = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formDefaultValues] = useState({
    title: '',
    description: '',
    operator: '',
    status: '',
    creationAt: '',
  });

  const { handleSubmit, control, formState, updateDefaultValues } = useCustomForm({
    defaultValues: formDefaultValues,
    onSubmit: (data) => {
      data.creationAt = new Date(data.creationAt);
      if (id) {
        dispatch(updateIssue({ id, ...data }));
      } else {
        dispatch(createIssue(data));
      }

      navigate('/manager/issues');
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(issueById(id))
        .then((response: any) => {
          updateDefaultValues(response.payload);
        });
    }
  }, [id]);

  const validations = {
    title: {
      required: 'Título es obligatorio',
    },
    description: {
      required: 'Descripción es obligatoria',
    },
    operator: {
      required: 'Operador es obligatorio',
    },
    status: {
      required: 'Estado es obligatorio',
    },
    creationAt: {
      required: 'Fecha de Creación es obligatoria',
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1> {id ? 'Actualizar incidencia' : 'Agregar incidencia'} </h1>
      <div className={styles.input}>
        <Controller
          name="title"
          control={control}
          rules={validations.title}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Título"
              fullWidth
            />
          )}
        />
        {formState.errors.title && <p> El título es inválido </p>}
      </div>

      <div className={styles.input}>
        <Controller
          name="description"
          control={control}
          rules={validations.description}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Descripción"
              fullWidth
            />
          )}
        />
        {formState.errors.description && <p> La descripción es inválida </p>}
      </div>

      <div className={styles.input}>
        <Controller
          name="operator"
          control={control}
          rules={validations.operator}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Operador"
              fullWidth
            />
          )}
        />
        {formState.errors.operator && <p> El operador es inválido </p>}
      </div>

      <div className={styles.input}>
        <Controller
          name="status"
          control={control}
          rules={validations.status}
          render={({ field }) => (
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="status">Estado</InputLabel>
              <Select
                {...field}
                label="Status"
                fullWidth
              >
                <MenuItem value="OPEN">Abierto</MenuItem>
                <MenuItem value="PROGRESS">En Proceso</MenuItem>
                <MenuItem value="CLOSED">Cerrado</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        {formState.errors.status && <p>El estado es inválido</p>}
      </div>

      <div className={styles.input}>
        <Controller
          name="creationAt"
          control={control}
          rules={validations.creationAt}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Fecha de creación (dd/mm/yyyy)"
              fullWidth
            />
          )}
        />
        {formState.errors.creationAt && <p> La fecha de creación es inválida </p>}
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!formState.isValid || !formState.isDirty}
      >
        Guardar
      </Button>
    </form>
  );
};

export default AddIssue;
