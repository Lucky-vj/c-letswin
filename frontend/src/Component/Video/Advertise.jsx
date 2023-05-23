import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TrophyIcon from '../../imges/Trophy-Icon.png'

export default function Advertise() {
  return (
    <Card className='adver-card' sx={{ minWidth: 220 }}>
      <CardContent>
        <Typography>
          <img src={TrophyIcon} />
        </Typography>
        <Typography variant="h4">
        Start Betslip
        </Typography>
        <Typography variant="h2">
        This Coupon
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">LOGIN</Button>
      </CardActions>
    </Card>
  );
}