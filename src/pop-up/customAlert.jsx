import Alert from '@mui/material/Alert';

export default function CustomAlert ({ message, severity }) {
  return (
    <Alert 
      style={{
        position: 'fixed',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
      }} 
      severity={severity}
    >
      {message}
    </Alert>
  );
}
