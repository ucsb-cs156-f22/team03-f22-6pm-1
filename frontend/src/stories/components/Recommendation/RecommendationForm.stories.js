import React from 'react';

import RecommendationForm from "main/components/Recommendation/RecommendationForm"
import { recommendationFixtures } from 'fixtures/recommendationFixtures';

export default {
    title: 'components/Recommendation/RecommendationForm',
    component: RecommendationForm
};


const Template = (args) => {
    return (
        <RecommendationForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: (data) => { console.log('Create was clicked, parameter t0 submitAction=',data); }
};

export const Show = Template.bind({});

Show.args = {
    recommendation: recommendationFixtures.oneDate,
    buttonLabel: "Update",
    submitAction: (data) => { console.log('Update was clicked, parameter to submitAction=',data)}
};
