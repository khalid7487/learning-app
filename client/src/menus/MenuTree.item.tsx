import React, {ReactElement} from "react";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {Link} from "react-router-dom";

// import {useParams} from "react-router-dom";

interface Props {
    nav: any,
    index: number,
}

export default function MenuTreeItem({nav, index}: Props): ReactElement {
    // let { collectionId }: any = useParams();
    return (
        <>
            {nav?.map((navItem: any, i: number) => navItem.hasSubMenu ?
                <SubMenu key={i + 'nav-menu'} title={navItem.title} icon={navItem.icon}>
                    {
                        <MenuTreeItem nav={navItem.submenus} index={i}/>
                    }
                </SubMenu> :

                <MenuItem key={i + 'nav-menu'} icon={navItem.icon}>
                    {navItem.title} <Link to={navItem.link}/>
                </MenuItem>
            )}
        </>
    )
};