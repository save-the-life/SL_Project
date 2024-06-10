import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        '& .Mui-selected': {
          color: '#0147E5', // 선택되었을 때의 색상
        },
        '& .MuiBottomNavigationAction-iconOnly': {
          color: '#d1d5db', // 선택되었을 때의 색상
        },
        '& .MuiTouchRipple-ripple': {
          color: '#ffffff', // 터치 영역 퍼지는 색상
        },
      }} // 하단에 고정
      value={value}
      onChange={handleChange}
      className="w-full fixed bottom-0 bg-white border-t border-gray-200 rounded-t-full"
    >
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Images"
        value="images"
        icon={<ImageIcon />}
      />
      <BottomNavigationAction
        label="Wallet"
        value="wallet"
        icon={<AccountBalanceWalletIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}
