const recommendationFixtures = {
    oneRecommendation: {
        "id": 1,
        "requesterEmail": "cgaucho@ucsb.edu",
        "professorEmail": "phtcon@ucsb.edu",
        "explanation": "BS/MS program",
        "dateRequested": "2022-04-20T00:00:00",
        "dateNeeded": "2022-05-01T00:00:00",
        "done": "false"
    },
    threeRecommendations: [
        {
            "id": 1,
            "requesterEmail": "request@ucsb.edu",
            "professorEmail": "prof@ucsb.edu",
            "explanation": "BS program",
            "dateRequested": "2022-04-20T00:00:00",
            "dateNeeded": "2022-05-01T00:00:00",
            "done": "false"
        },
        {
            "id": 2,
            "requesterEmail": "cgaucho@ucsb.edu",
            "professorEmail": "phtcon@ucsb.edu",
            "explanation": "BS/MS program",
            "dateRequested": "2022-04-20T00:00:00",
            "dateNeeded": "2022-05-01T00:00:00",
            "done": "false"
        },
        {
            "id": 3,
            "requesterEmail": "test@ucsb.edu",
            "professorEmail": "testing@ucsb.edu",
            "explanation": "Quesetion",
            "dateRequested": "2022-04-20T00:00:00",
            "dateNeeded": "2022-05-01T00:00:00",
            "done": "false"
        } 
    ]
};


export { recommendationFixtures };