import React, {ReactElement} from 'react'
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter} from "react-pro-sidebar";
import {FaGem} from "react-icons/all";
import MenuTreeItem from "./MenuTree.item";


export default function SideNavbar({collapsedSidebar, toggleSidebar, sidebarMenusData, onLogout}: any): ReactElement {

    return (


        <ProSidebar collapsed={collapsedSidebar} breakPoint="sm" toggled={!collapsedSidebar}
                    onToggle={toggleSidebar}>

            {/*<SidebarHeader>*/}
            {/*    <Menu iconShape="square">*/}
            {/*        <MenuItem icon={<FaGem/>}> Main Page <Link to="/"/>  </MenuItem>*/}
            {/*    </Menu>*/}
            {/*</SidebarHeader>*/}

            <SidebarContent>

                <Menu iconShape="round">
                    {/*{sidebarMenusData?.map((nav: any, index) => nav.hasSubMenu ?

                            <SubMenu key={index + 'nav-menu'} title={nav.title} icon={nav.icon}>
                                {
                                    nav.submenus.map((submenu: any, i: any) => submenu.hasSubMenu ?

                                        <SubMenu key={i + 'nav-menu'} title={submenu.title} icon={nav.icon}>
                                            {
                                                submenu.submenus.map((submenu: any, i: any) =>
                                                    <MenuItem key={i + 'nav-submenu'}>
                                                        {submenu.title}
                                                        {submenu.link && <Link to={submenu.link}/>}
                                                    </MenuItem>
                                                )

                                            }
                                        </SubMenu> :

                                        <MenuItem key={i + 'nav-submenu'}>
                                            {submenu.title}
                                            {submenu.link && <Link to={submenu.link}/>}
                                        </MenuItem>
                                    )

                                }
                            </SubMenu> :

                            <MenuItem key={index + 'nav-menu'} icon={nav.icon}>
                                {nav.title} <Link to={nav.link}/>
                            </MenuItem>
                        )}*/}

                    <MenuTreeItem nav={sidebarMenusData} index={1}/>


                    {/*<MenuItem icon={<FaGem />}>Collection <Link to={`${url}/collection`}/> </MenuItem>
                        <SubMenu title="User Management" icon={<FaHeart />}>
                            <MenuItem> Users <Link to={`${url}/users`} /> </MenuItem>
                            <MenuItem> Registration  </MenuItem>

                                <SubMenu style={{background: "#1d1d1d", color: "#fff"}} title="User Management" icon={<FaHeart />}>
                                    <MenuItem> Users <Link to={`${url}/users`} /> </MenuItem>
                                    <MenuItem> Registration  </MenuItem>
                                    <MenuItem> Roles </MenuItem>
                                </SubMenu>

                        </SubMenu>*/}
                </Menu>

            </SidebarContent>
            <SidebarFooter>
                <Menu>
                    <MenuItem icon={<FaGem/>} onClick={onLogout}>Logout</MenuItem>
                </Menu>
            </SidebarFooter>


        </ProSidebar>


    )
}
