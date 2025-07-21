import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import {type ShiftMenuItem } from '../../data/siteData';

interface DropdownMenuProps {
  menuItems: ShiftMenuItem[];
  onItemClick: (item: ShiftMenuItem) => void;
  trigger?: React.ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end';
  activationMode?: 'hover' | 'click';
}

interface SubMenuProps {
  items: ShiftMenuItem[];
  onItemClick: (item: ShiftMenuItem) => void;
  parentElement: HTMLElement;
}

const SubMenu: React.FC<SubMenuProps> = ({ items, onItemClick, parentElement }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (parentElement) {
      const rect = parentElement.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 5
      });
    }
  }, [parentElement]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        minWidth: 160,
        zIndex: 1300,
        py: 1
      }}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          onClick={() => onItemClick(item)}
          sx={{
            px: 2,
            py: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '13px',
              color: item.color || '#333'
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menuItems,
  onItemClick,
  trigger,
  placement = 'bottom-start',
  activationMode = 'hover'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showSubMenu, setShowSubMenu] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (activationMode === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (activationMode === 'hover') {
      setIsOpen(false);
      setHoveredItem(null);
      setShowSubMenu(null);
    }
  };

  const handleClick = () => {
    if (activationMode === 'click') {
      setIsOpen(!isOpen);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (activationMode === 'click' &&
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setHoveredItem(null);
      setShowSubMenu(null);
    }
  };

  useEffect(() => {
    if (activationMode === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [activationMode]);

  const handleItemClick = (item: ShiftMenuItem) => {
    if (!item.subMenu) {
      onItemClick(item);
      setIsOpen(false);
      setHoveredItem(null);
      setShowSubMenu(null);
    }
  };

  const handleItemHover = (itemId: string, element: HTMLElement) => {
    setHoveredItem(itemId);
    setHoveredElement(element);
    const item = menuItems.find(i => i.id === itemId);
    if (item?.subMenu) {
      setShowSubMenu(itemId);
    } else {
      setShowSubMenu(null);
    }
  };

  const getMenuPosition = () => {
    if (!triggerRef.current) return { top: 0, left: 0 };
    
    const rect = triggerRef.current.getBoundingClientRect();
    
    switch (placement) {
      case 'bottom-start':
        return { top: rect.bottom + 5, left: rect.left };
      case 'bottom-end':
        return { top: rect.bottom + 5, left: rect.right - 160 };
      case 'right-start':
        return { top: rect.top, left: rect.right + 5 };
      case 'right-end':
        return { top: rect.bottom - 200, left: rect.right + 5 };
      default:
        return { top: rect.bottom + 5, left: rect.left };
    }
  };

  const menuPosition = getMenuPosition();

  return (
    <Box
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      sx={{ position: 'relative', display: 'inline-block' }}
    >
      {trigger || (
        <IconButton size="small" sx={{ p: 0.5 }}>
          <KeyboardArrowDown sx={{ fontSize: '16px', color: '#666' }} />
        </IconButton>
      )}

      {isOpen && (
        <>
          <Box
            ref={menuRef}
            sx={{
              position: 'fixed',
              top: menuPosition.top,
              left: menuPosition.left,
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: 160,
              zIndex: 1300,
              py: 1
            }}
          >
            {menuItems.map((item) => (
              <Box
                key={item.id}
                onClick={() => handleItemClick(item)}
                onMouseEnter={(e) => handleItemHover(item.id, e.currentTarget as HTMLElement)}
                sx={{
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: hoveredItem === item.id ? '#f5f5f5' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '13px',
                    color: item.color || '#333'
                  }}
                >
                  {item.label}
                </Typography>
                {item.subMenu && (
                  <KeyboardArrowRight sx={{ fontSize: '16px', color: '#666' }} />
                )}
              </Box>
            ))}
          </Box>

          {showSubMenu && hoveredElement && (
            <SubMenu
              items={menuItems.find(i => i.id === showSubMenu)?.subMenu || []}
              onItemClick={onItemClick}
              parentElement={hoveredElement}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default DropdownMenu;
