import React from 'react';

import MenuItemsTable from "main/components/MenuItems/MenuItemsTable";
import { menuItemsFixtures } from 'fixtures/menuItemsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/MenuItems/MenuItemsTable',
    component: MenuItemsTable
};

const Template = (args) => {
    return (
        <DiningCommonsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    diningCommons: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    diningCommons: diningCommonsFixtures.threeCommons
};

export const ThreeDatesAsAdmin = Template.bind({});

ThreeDatesAsAdmin.args = {
    diningCommons: diningCommonsFixtures.threeCommons,
    currentUser: currentUserFixtures.adminUser
};

