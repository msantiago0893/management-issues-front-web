import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './header.module.sass';

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>SmartShop</h1>

      <Stack direction="row" spacing={1}>
        <Button component={Link} to="/signin" color="inherit"> Acceso </Button>
        <Button component={Link} to="/signup" color="inherit"> Registro </Button>
      </Stack>

    </div>
  );
};

export default Header;
