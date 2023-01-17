import React from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Hamburger from '.././images/menu-icon.svg'

function Layout() {
    const { toggleSidebar, broken, toggled } = useProSidebar();

    const toggle = () => {
        toggleSidebar();
        if (toggled) {
          console.log(true);
        } else {
          console.log(false);
        }
      };

    return (
        <div style={{ display: 'flex', height: '100%', marginRight: broken ? "0px" : "10px" }}>
            <Sidebar
                backgroundColor="rgb(180, 0, 0)"
                breakPoint="sm"
                transitionDuration={800}
                width="160px"
                collapsedWidth='60px'>
                <Menu>
                    {broken && <MenuItem style={{padding: "2px"}} onClick={() => toggle()}>{<img style={{width: "34px", height: "40px"}} src={Hamburger}></img>}</MenuItem>}
                    <MenuItem style={{padding: "2px"}} component={<Link to="/progress"/>}> Progress</MenuItem>
                </Menu>
            </Sidebar>
            {broken && <img onClick={() => toggle()} style={{width: "34px", height: "40px"}} src={Hamburger}></img>}
        </div>
    );
}

export default Layout