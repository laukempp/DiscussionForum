const request = require('supertest');
const app = require('../app')

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
    .post('/api/topics').send({title:'Otsikko', nickname: 'Nimimerkki', comment: 'Testikommentti'}).then(response => {
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
    const comment = "uusi kommentti";
    return request(app)
    .put(`/api/topics/${id}`).send({nickname, title, comment}).then(response => {
        expect(response.statusCode).toBe(200 || 204);
        expect(response.body).toBeDefined();
        expect(response.body.nickname).toMatch('Veikko');
    })
})