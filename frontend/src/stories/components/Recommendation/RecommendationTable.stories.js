import React from 'react';

import RecommendationTable from 'main/components/Recommendation/RecommendationTable'
import { recommendationFixtures } from 'fixtures/recommendationFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Recommendation/RecommendationTable',
    component: RecommendationTable
};

const Template = (args) => {
    return (
        <RecommendationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    recommendation: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    recommendation: recommendationFixtures.threeRecommendations
};

export const ThreeDatesAsAdmin = Template.bind({});

ThreeDatesAsAdmin.args = {
    recommendation: recommendationFixtures.threeRecommendations,
    currentUser: currentUserFixtures.adminUser
}

