const reviewsFixtures = {
    oneReview: {
        "id": 1,
        "itemId": 1,
        "reviewerEmail": "test1@gmail.com",
        "stars": 5,
        "dateReviewed": "2022-05-16T02:22:22",
        "comments": "Best Pizza Ever"
    },
    threeReviews: [
        {
            "id": 1,
            "itemId": 1,
            "reviewerEmail": "test2@gmail.com",
            "stars": 2,
            "dateReviewed": "2022-05-16T02:22:33",
            "comments": "Ok food nothing special"
        },
        {
            "id": 2,
            "itemId": 2,
            "reviewerEmail": "test3@gmail.com",
            "stars": 3,
            "dateReviewed": "2022-05-16T02:22:44",
            "comments": "Average food"
        },
        {
            "id": 3,
            "itemId": 3,
            "reviewerEmail": "test4@gmail.com",
            "stars": 4,
            "dateReviewed": "2022-05-16T02:22:44",
            "comments": "Pretty Good, Definitely would go again"
        } 
    ]
};


export { reviewsFixtures };