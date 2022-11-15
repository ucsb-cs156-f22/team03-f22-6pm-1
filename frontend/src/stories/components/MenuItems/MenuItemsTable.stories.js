import React from 'react';

import MenuItemsTable from "main/components/MenuItems/MenuItemsTable";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { menuItemsFixtures } from 'fixtures/menuItemsFixtures';

export default {
    title: 'components/MenuItems/MenuItemsTable',
    component: MenuItemsTable
};

const Template = (args) => {
    return (
        <MenuItemsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuItems: []
};

export const ThreeMenuItems = Template.bind({});

ThreeMenuItems.args = {
    menuItems: menuItemsFixtures.threeMenuItems
};

export const ThreeMenuItemsAsAdmin = Template.bind({});

ThreeMenuItemsAsAdmin.args = {
    menuItems: menuItemsFixtures.threeMenuItems,
    currentUser: currentUserFixtures.adminUser
};