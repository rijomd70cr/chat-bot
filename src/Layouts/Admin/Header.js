import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getColors, getConfig, getMenus } from '../../Core/Utilities';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function ClippedDrawer({children}) {

    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const urlMatching = (url) => {
        let splitUrl = location.pathname.split('/');
        url = url.replace('/', '')
        return splitUrl.includes(url);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar variant="dense" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar variant="dense">
                    <Typography variant="h6" noWrap component="div">
                        {getConfig('APP_NAME')}
                    </Typography>
                </Toolbar>
            </AppBar>
            {matches ? 
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {getMenus().map((value, index) => (
                                <ListItem style={{background: urlMatching(value.path) ? getColors('#f3f3f3') : getColors('white')}} onClick={event => navigate(getConfig('DOMAIN_PREFIX') + value.path)} key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={value.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            : null }
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar variant="dense"/>
                <div>{children}</div>
            </Box>
        </Box>
    );
}
