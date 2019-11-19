const request = require('supertest');
const app = require('../app')


// Testataan topiceja:
test("/api/topics should return data (statuscode 200)", () => {
  return request(app)
    .get('/api/topics').then(response => {
      expect(response.statusCode).toBe(200);
  });
});
test("/api/topics/1 should return topic with id 1", ()=>{
    return request(app)
    .get('/api/topics/1').then(response => {
        expect(response.statusCode).toBe(200);
    })
})
test("/api/topics should be able to make a post SC(201)", ()=>{
    return request(app)
    .post('/api/topics').send({title:'Otsikko', nickname: 'Nimimerkki'}).then(response => {
        expect(response.statusCode).toBe(201);
    })
})

test("/api/topics/:id should delete a topic", () => {
    const id = 4;
    const title = "Otsikko";
    return request(app)
    .delete(`/api/topics/${id}`).then(response => {
        expect(response.statusCode).toBe(202);
    })
})

test("/api/topics/:id should be able to update a topic", ()=>{
    const id = 10;
    const nickname = "Veikko";
    const title = "uusi title";
    return request(app)
    .put(`/api/topics/${id}`).send({nickname, title}).then(response => {
        expect(response.statusCode).toBe(200 || 204);
        expect(response.body).toBeDefined();
        expect(response.body.nickname).toMatch('Veikko');
    })
})

// Testataan kommentteja
// Näyttää kaikki topicin kommentit
test("/api/topics/:id/comments should return data (statuscode 200)", () => {
return request(app)
    .get('/api/topics/1/comments').then(response => {
    expect(response.statusCode).toBe(200);
});
});
test("/api/topics/1/comments/1 should return topic with id 1", ()=>{
    return request(app)
    .get('/api/topics/1/comments/1').then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.c_nickname).toMatch('testinimimerkki');
    })
})
test("/api/topics should be able to make a post SC(201)", ()=>{
    return request(app)
    .post('/api/topics/1/comments').send({topic_id: 1, input:'testi', c_nickname: 'Nimimerkki'}).then(response => {
        expect(response.statusCode).toBe(201);
    })
})

test("/api/topics/:id/comments/:id should delete a comment", () => {
    const id = 1;
    const input = "Kommentti";
    return request(app)
    .delete(`/api/topics/${id}/comments/${id}`).then(response => {
        expect(response.statusCode).toBe(202);
    })
})

test("/api/topics/:id should be able to update a comment", ()=>{
    const topic_id = 1;
    const c_nickname = "testinimimerkki";
    const input = "uusi input";
    return request(app)
    .put(`/api/topics/${topic_id}/comments/${topic_id}`).send({topic_id, c_nickname, input}).then(response => {
        expect(response.statusCode).toBe(200 || 204);
        expect(response.body).toBeDefined();
        expect(response.body.c_nickname).toMatch('testinimimerkki');
    })
})