import React from 'react';

import RecommendationTable from "main/components/Recommendation/RecommednationTable";
import { recommendationFixtures } from 'fixtures/recommendationFixtures';

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
    dates: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    dates: recommendationFixtures.threeRecommendations
};


