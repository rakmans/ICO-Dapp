import { Card, Avatar, Typography, CardContent } from "@mui/material";
import { UilUsersAlt } from "@iconscout/react-unicons";
const Holders = ({ props }) => {
  return (
    <Card sx={{ width: "22%", height: 220, borderRadius: 7 }}>
      <CardContent>
        <Avatar sx={{ p: 0.5, bgcolor: `#3f51b5` }}>
          <UilUsersAlt />
        </Avatar>
        <Typography variant="h4" mt={1}>
          Holders
        </Typography>
        <Typography variant="h5" mt={1} ml={2}>
          {props.toString()}
        </Typography>
        <Typography mt={2} variant="body2">
          Accounts that have purchased Tokens
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Holders;
