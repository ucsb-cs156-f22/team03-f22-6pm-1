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
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    recommendation: recommendationFixtures.oneDate,
    submitText: "",
    submitAction: () => { }
};
