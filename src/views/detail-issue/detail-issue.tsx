import { Card, CardContent, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";import { issueById } from "../../redux/asyncThunk/issue.thunk";

const DetailIssue = () => {
  const dispatch = useAppDispatch();
  const issue: any = useAppSelector((state) => state.issue.issue);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(issueById(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      {issue ? (
        <Card sx={{ maxWidth: 390 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" mt={2}>
              {issue.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Incidencia creada: {issue.operator}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Status: { issue.status === 'OPEN' ? 'ABIERTO' : issue.status === 'CLOSED' ? 'CERRADO' : 'EN PROGRESO' }
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Descripción: {issue.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Fecha de creación: {issue.creationAt}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom>
            La categoría no existe.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default DetailIssue;
