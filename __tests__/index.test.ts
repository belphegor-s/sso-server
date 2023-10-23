import request from "supertest";
import app from "../src/index";

const randomGen = () => Math.random().toString(36).substring(2, 10);

describe("Auth API Tests", () => {
    let authToken = "";
    let testUserId = "";
    const user = {
        username: randomGen(),
        password: randomGen(),
    };

    // Test user registration
    it("registers a user", (done: jest.DoneCallback) => {
        request(app)
            .post("/api/v1/register")
            .send({ usernam: user.username, password: user.password })
            .expect(200)
            .expect((res) => {
                expect(res.body.msg).toBe("Successfully registered User");
                testUserId = res.body.data.id;
            })
            .end(done);
    });

    // Test user login and JWT generation
    it("logs in a user and generates a JWT", (done) => {
        request(app)
            .post("/api/v1/login")
            .send({ username: user.username, password: user.password })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.token).toBeDefined();
                authToken = res.body.data.token;
            })
            .end(done);
    });

    // Test access to a protected resource
    it("allows access to a protected resource with a valid JWT", (done) => {
        request(app)
            .get("/api/v1/protected")
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200)
            .expect((res) => expect(res.body.msg).toBe("You are authorized to access this resource."))
            .end(done);
    });

    // Test access to a protected resource without a JWT
    it("blocks access to a protected resource without a JWT", (done) => {
        request(app)
            .get("/api/v1/protected")
            .expect(401)
            .expect((res) => expect(res.text).toBe("Unauthorized"))
            .end(done);
    });

    // Clean up after testing
    afterAll((done) => {
        if (testUserId) {
            request(app).delete(`/api/v1/user/${testUserId}`).set("Authorization", `Bearer ${authToken}`).expect(200).end(done);
        }
    });
});
