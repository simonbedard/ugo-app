"use client"

import { useState } from 'react';

import IconButton from '@mui/joy/IconButton';
import { styled } from '@mui/joy/styles';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Typography from '@mui/joy/Typography';

const Popup = styled(PopperUnstyled)({
    zIndex: 1000,
});

export default function SearchColors() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [color, setColor] = useState({});
    const colors = [
        {
            hex: "#ff0000",
            name: "Red"
        },
        {
            hex: "#9c27b0",
            name: "Purple"
        },
        {
            hex: "#2196f3",
            name: "Blue"
        },
        {
            hex: "#4caf50",
            name: "Green"
        },
        {
            hex: "#ffeb3b",
            name: "Yellow"
        },
        {
            hex: "#ff9800",
            name: "Orange"
        },
        {
            hex: "#ffffff",
            name: "White"
        },
        {
            hex: "#000000",
            name: "Black"
        }
    ];

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  
    };
    const handleClose = (event) => {
      setAnchorEl(null);
      console.log(event);
    };
    const handleListKeyDown = (event) => {
      if (event.key === 'Tab') {
        setAnchorEl(null);
      } else if (event.key === 'Escape') {
        anchorEl.focus();
        setAnchorEl(null);
      }
    };

    return (
        <div>
        <input type="text" name="color" value={color.name}  hidden readOnly/>
        <IconButton           
          aria-controls={open ? 'composition-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="solid"
          sx={{ bgcolor: 'background.body' }} 
          onClick={handleClick}
          >
              <ColorLensIcon sx={{ color: color.hex }} />
        </IconButton>
        <Popup
          role={undefined}
          id="composition-menu"
          open={open}
          anchorEl={anchorEl}
          disablePortal
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ]}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              variant="outlined"
              onKeyDown={handleListKeyDown}
              sx={{ boxShadow: 'md', bgcolor: 'background.body' }}
            >
                <MenuItem className={`ugo-color-picker ${color.name == null ? "active" : ""}`}  onClick={() => {setColor({})}}>
                        <span className='color-dot'></span>
                        
                        <Typography level="body2" component="p">All</Typography></MenuItem>

                {colors.map((item, index) => {
                    return <MenuItem key={index} className={`ugo-color-picker ${color.name == item.name ? "active" : ""}`} onClick={() => {setColor(item)}}>
                        <span className='color-dot' style={{ backgroundColor: item.hex}}></span>
                        <Typography level="body2" component="p">{item.name}</Typography></MenuItem>
                })}
            </MenuList>
          </ClickAwayListener>
        </Popup>
        </div>
    )
}