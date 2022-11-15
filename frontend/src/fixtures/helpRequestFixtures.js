const helpRequestFixtures = {
    oneHelpRequests: {
        "id": 2,
        "requesterEmail": "hey",
        "teamId": "1",
        "tableOrBreakoutRoom": "table",
        "requestTime": "2000-01-01T00:00:00",
        "explanation": "yo",
        "solved": true
    },
    threeHelpRequests: [
        {
            "id": 1,
            "requesterEmail": "its",
            "teamId": "1",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2000-01-01T00:00:00",
            "explanation": "im good",
            "solved": false
        },
        {
            "id": 2,
            "requesterEmail": "me",
            "teamId": "2",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2000-01-01T00:00:00",
            "explanation": "no",
            "solved": true
        },
        {
            "id": 3,
            "requesterEmail": "saahil",
            "teamId": "3",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2000-01-01T00:00:00",
            "explanation": "thanks",
            "solved": false
        }
    ]
};

export { helpRequestFixtures };