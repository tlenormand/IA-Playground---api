import mongoDB from '../../src/db/MongoDB.mjs';


export default mongoTest = (user) => {
    const email = 'userTest1@test.test';

    // find user by email
    test('Find user by email', () => {
        mongoDB.db.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('User:', user);
            }
        });

        expect(mongoDB.db.findOne
            .mock
            .calls[0][0]
        ).toEqual({ email: email });

    });
}
