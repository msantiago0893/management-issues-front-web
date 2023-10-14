import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import styles from './index.module.sass';

interface SidebarProps {
  showSidebar: boolean;
}

interface MenuItem {
  label: string;
  icon: React.ReactElement;
  path: string;
  subItems?: MenuItem[];
}

const sections: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <PeopleAltIcon />,
    path: '/manager/dashboard',
    subItems: []
  },
  {
    label: 'Issues',
    icon: <CategoryIcon />,
    path: '',
    subItems: [
      {
        label: 'Consulta',
        icon: <SearchIcon />,
        path: '/manager/issues',
      },
      {
        label: 'Agregar',
        icon: <AddCircleOutlineIcon />,
        path: '/manager/addIssue',
      },
    ],
  }
];

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSectionClick = (section: MenuItem) => {
    if (section.subItems && section.subItems.length > 0) {
      if (openSections.includes(section.path)) {
        setOpenSections(openSections.filter((path) => path !== section.path));
      } else {
        setOpenSections([...openSections, section.path]);
      }
    } else {
      navigate(section.path);
    }
  };

  return (
    <nav className={styles.sidebar} style={{ width: showSidebar ? '14rem' : '0' }}>
      <List>
        {sections.map((section) => (
          <div key={section.label}>
            <ListItem button onClick={() => handleSectionClick(section)}>
              <ListItemIcon>
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.label} />
              {section.subItems && section.subItems.length > 0 && (
                openSections.includes(section.path) ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )
              )}
            </ListItem>
            <Collapse in={openSections.includes(section.path)} unmountOnExit>
              <List style={{ paddingLeft: '20px' }}>
                {section.subItems?.map((subItem) => (
                  <ListItem button key={subItem.label} component={Link} to={subItem.path}>
                    <ListItemIcon>
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </nav>
  );
};

export default Sidebar;
