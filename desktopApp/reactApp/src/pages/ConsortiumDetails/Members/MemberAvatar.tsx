import { styled } from '@mui/material/styles';
import { Avatar, Box } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Shield from '../../../assets/shield.svg';
import GreyShield from '../../../assets/grey_shield.svg';

const UserColor: string[] = [
  "#2FA84F",
  "#FFBA08",
  "#FF007A",
  "#F25919",
  "#B91372",
  "#440381",
  "#016572"
];

const GetUserColor = (index: number, active: boolean): string => {
  if (active) {
    const valkeyIndex = index % UserColor.length; 
    return UserColor[valkeyIndex];
  } else {
    return "#e8e8e8";
  }
};

const UserAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'admin' && prop !== 'active'
})<{ index: number; admin: boolean; active: boolean }>(({ index, admin, active }) => ({
  width: '45px',
  height: '45px',
  background: !admin ? GetUserColor(index, active) : 'none'
}));

interface MemberAvatarProps {
  username: string;
  isLeader: boolean;
  isActive: boolean;
  isReady: boolean;
  index: number;
}

const MemberAvatar: React.FC<MemberAvatarProps> = (props) => {   

  const { username, isLeader, isActive, isReady, index } = props;
  
  return (
    <Box 
      style={{
        position: "relative",
        display: "inline-flex",
        marginRight: "0.5rem",
        marginBottom: "0.5rem",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        animation: "fadeIn 2s"
      }}>
      {isReady ? 
        <CheckCircleIcon 
          sx={{ 
            position: 'absolute',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            color: '#2FA84F', 
            width: '16px', 
            height: '16px', 
            top: '-2px',
            marginLeft: '2rem',
            zIndex: '3',
          }}
        /> : ''}
      <UserAvatar index={index} admin={isLeader} active={isActive}>
        <span
          style={{ 
            position: 'absolute',
            width: '45px', 
            height: '45px', 
            zIndex: '2',
            top: '33%',
          }}
        >
          {username.charAt(0).toUpperCase()}
        </span>
        {isLeader && 
        <img 
          src={isActive ? Shield : GreyShield}
          style={{ 
            position: 'absolute',
            width: '50px', 
            height: '50px', 
            zIndex: '1',
            objectFit: 'cover',
          }} 
        />}
      </UserAvatar>
      <span className='username' style={isActive ? { color: '#000' } : { color: '#ccc' }}>{username}</span>
    </Box>
  );
}

export default MemberAvatar;
